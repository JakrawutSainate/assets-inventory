use common::models::UserRole;
use common::validation;
use db::users;
use tonic::{Request, Response, Status};
use uuid::Uuid;

use crate::jwt::{decode_token, encode_token};
use crate::metadata::bearer_token;
use crate::pb_auth::auth_service_server::AuthService;
use crate::pb_auth::{
    AuthReply, Empty, LoginRequest, MeReply, PublicUser as PbPublicUser, RegisterRequest,
};
use crate::state::GrpcState;

pub struct AuthGrpc {
    pub state: GrpcState,
}

fn to_pb_user(
    id: Uuid,
    email: &str,
    role: UserRole,
    display_name: &str,
    avatar_url: &str,
) -> PbPublicUser {
    PbPublicUser {
        id: id.to_string(),
        email: email.to_string(),
        role: match role {
            UserRole::Admin => "admin".to_string(),
            UserRole::User => "user".to_string(),
        },
        name: display_name.to_string(),
        avatar_url: avatar_url.to_string(),
    }
}

#[tonic::async_trait]
impl AuthService for AuthGrpc {
    async fn register(
        &self,
        req: Request<RegisterRequest>,
    ) -> Result<Response<AuthReply>, Status> {
        let body = req.into_inner();
        validation::validate_email(&body.email)
            .map_err(|_| Status::invalid_argument("invalid email"))?;
        validation::validate_password(&body.password)
            .map_err(|_| Status::invalid_argument("invalid password"))?;

        if users::find_user_by_email(&self.state.pool, &body.email)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "register lookup");
                Status::internal("database error")
            })?
            .is_some()
        {
            return Err(Status::already_exists("email already registered"));
        }

        let name = body.name.as_deref();
        let id = users::create_user(
            &self.state.pool,
            &body.email,
            &body.password,
            UserRole::User,
            name,
        )
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "register insert");
            Status::internal("database error")
        })?;

        let user = users::get_public_user_by_id(&self.state.pool, id)
            .await
            .map_err(|_| Status::internal("database error"))?
            .ok_or_else(|| Status::internal("user missing after insert"))?;

        let token = encode_token(&self.state, id, &user.email, user.role).map_err(|e| {
            tracing::error!(error = %e, "jwt");
            Status::internal("token error")
        })?;

        let pb = to_pb_user(
            id,
            &user.email,
            user.role,
            &user.display_name,
            &user.avatar_url,
        );
        Ok(Response::new(AuthReply {
            token,
            user: Some(pb),
        }))
    }

    async fn login(&self, req: Request<LoginRequest>) -> Result<Response<AuthReply>, Status> {
        let body = req.into_inner();
        validation::validate_email(&body.email)
            .map_err(|_| Status::invalid_argument("invalid email"))?;
        validation::validate_password(&body.password)
            .map_err(|_| Status::invalid_argument("invalid password"))?;

        let user = users::verify_credentials(&self.state.pool, &body.email, &body.password)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "login");
                Status::internal("database error")
            })?
            .ok_or_else(|| Status::unauthenticated("invalid credentials"))?;

        let id = Uuid::parse_str(&user.id).map_err(|_| Status::internal("bad user id"))?;

        let token = encode_token(&self.state, id, &user.email, user.role).map_err(|e| {
            tracing::error!(error = %e, "jwt");
            Status::internal("token error")
        })?;

        let pb = to_pb_user(
            id,
            &user.email,
            user.role,
            &user.display_name,
            &user.avatar_url,
        );
        Ok(Response::new(AuthReply {
            token,
            user: Some(pb),
        }))
    }

    async fn me(&self, req: Request<Empty>) -> Result<Response<MeReply>, Status> {
        let token = bearer_token(&req)?;
        let auth = decode_token(&self.state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
        let user = users::get_public_user_by_id(&self.state.pool, auth.id)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "me");
                Status::internal("database error")
            })?
            .ok_or_else(|| Status::unauthenticated("user not found"))?;

        let id = Uuid::parse_str(&user.id).map_err(|_| Status::internal("bad id"))?;
        let pb = to_pb_user(
            id,
            &user.email,
            user.role,
            &user.display_name,
            &user.avatar_url,
        );
        Ok(Response::new(MeReply {
            user: Some(pb),
        }))
    }
}
