//! gRPC API (assets, auth, admin) — used by `runner` and the `asset-grpc` binary.

mod admin_svc;
mod auth_svc;
mod jwt;
mod metadata;
pub mod state;

use std::net::SocketAddr;

use common::models::{Asset, AssetStatus, UserAsset, UserAssetStatus, UserRole};
use common::validation;
use tonic::{transport::Server, Request, Response, Status};

pub mod pb {
    tonic::include_proto!("asset_v1");
}

pub mod pb_auth {
    tonic::include_proto!("auth_v1");
}

pub mod pb_admin {
    tonic::include_proto!("admin_v1");
}

pub use state::GrpcState;

use admin_svc::AdminGrpc;
use auth_svc::AuthGrpc;
use jwt::decode_token;
use metadata::bearer_token;
use pb::asset_service_server::{AssetService as AssetServiceTrait, AssetServiceServer};
use pb::{
    AdminAsset, AssetStatus as PbAssetStatus, Empty as AssetEmpty, GetUserAssetReply,
    GetUserAssetRequest, ListAdminAssetsReply, ListDashboardAssetsReply, ListSimilarAssetsReply,
    UserAsset as PbUserAsset, UserAssetStatus as PbUserStatus,
};
use pb_admin::admin_service_server::AdminServiceServer;
use pb_auth::auth_service_server::AuthServiceServer;

#[derive(Clone)]
struct AssetGrpc {
    state: GrpcState,
}

#[tonic::async_trait]
impl AssetServiceTrait for AssetGrpc {
    async fn list_admin_assets(
        &self,
        req: Request<AssetEmpty>,
    ) -> Result<Response<ListAdminAssetsReply>, Status> {
        let token = bearer_token(&req)?;
        let auth = decode_token(&self.state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
        if auth.role != UserRole::Admin {
            return Err(Status::permission_denied("admin role required"));
        }
        let list = self
            .state
            .assets
            .list_admin_assets()
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "list_admin_assets");
                Status::internal("unavailable")
            })?;
        let items = list.into_iter().map(to_pb_admin).collect();
        Ok(Response::new(ListAdminAssetsReply { items }))
    }

    async fn list_dashboard_assets(
        &self,
        req: Request<AssetEmpty>,
    ) -> Result<Response<ListDashboardAssetsReply>, Status> {
        let token = bearer_token(&req)?;
        let _auth = decode_token(&self.state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
        let list = self
            .state
            .assets
            .list_user_dashboard_assets()
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "list_dashboard_assets");
                Status::internal("unavailable")
            })?;
        let items = list.iter().map(to_pb_user).collect();
        Ok(Response::new(ListDashboardAssetsReply { items }))
    }

    async fn get_user_asset(
        &self,
        req: Request<GetUserAssetRequest>,
    ) -> Result<Response<GetUserAssetReply>, Status> {
        let token = bearer_token(&req)?;
        let _auth = decode_token(&self.state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
        let id = req.into_inner().id;
        if validation::validate_asset_id(&id).is_err() {
            return Err(Status::invalid_argument("invalid id"));
        }
        let asset = self
            .state
            .assets
            .get_user_asset(&id)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "get_user_asset");
                Status::internal("unavailable")
            })?;
        let pb = asset.as_ref().map(to_pb_user);
        Ok(Response::new(GetUserAssetReply { asset: pb }))
    }

    async fn list_similar_assets(
        &self,
        req: Request<AssetEmpty>,
    ) -> Result<Response<ListSimilarAssetsReply>, Status> {
        let token = bearer_token(&req)?;
        let _auth = decode_token(&self.state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
        let list = self
            .state
            .assets
            .list_similar_user_assets(3)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "list_similar");
                Status::internal("unavailable")
            })?;
        let items = list.iter().map(to_pb_user).collect();
        Ok(Response::new(ListSimilarAssetsReply { items }))
    }
}

fn to_pb_admin(a: Asset) -> AdminAsset {
    let (has_custodian, custodian_name) = match &a.custodian_name {
        Some(s) => (true, s.clone()),
        None => (false, String::new()),
    };
    AdminAsset {
        id: a.id,
        name: a.name,
        serial_number: a.serial_number,
        image_url: a.image_url,
        status: admin_status(a.status) as i32,
        category: a.category,
        custodian_name,
        has_custodian,
        value_usd: a.value_usd,
    }
}

fn admin_status(s: AssetStatus) -> PbAssetStatus {
    match s {
        AssetStatus::Assigned => PbAssetStatus::AsAssigned,
        AssetStatus::Available => PbAssetStatus::AsAvailable,
        AssetStatus::Maintenance => PbAssetStatus::AsMaintenance,
    }
}

fn to_pb_user(a: &UserAsset) -> PbUserAsset {
    PbUserAsset {
        id: a.id.clone(),
        name: a.name.clone(),
        image_url: a.image_url.clone(),
        status: user_status(a.status) as i32,
        category: a.category.clone(),
        location_label: a.location_label.clone(),
        daily_rate_usd: a.daily_rate_usd,
        action_label: a.action_label.clone(),
    }
}

fn user_status(s: UserAssetStatus) -> PbUserStatus {
    match s {
        UserAssetStatus::Available => PbUserStatus::UaAvailable,
        UserAssetStatus::Borrowed => PbUserStatus::UaBorrowed,
        UserAssetStatus::Reserved => PbUserStatus::UaReserved,
        UserAssetStatus::InTransit => PbUserStatus::UaInTransit,
    }
}

/// Serves Asset, Auth, and Admin gRPC on one address.
pub async fn serve(addr: SocketAddr, state: GrpcState) -> Result<(), tonic::transport::Error> {
    let asset_svc = AssetGrpc {
        state: state.clone(),
    };
    let auth_svc = AuthGrpc { state: state.clone() };
    let admin_svc = AdminGrpc { state };

    Server::builder()
        .add_service(AssetServiceServer::new(asset_svc))
        .add_service(AuthServiceServer::new(auth_svc))
        .add_service(AdminServiceServer::new(admin_svc))
        .serve(addr)
        .await
}
