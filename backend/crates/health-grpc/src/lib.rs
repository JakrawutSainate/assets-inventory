//! Tiny health gRPC service.

use std::net::SocketAddr;

use tonic::{transport::Server, Request, Response, Status};

pub mod pb {
    tonic::include_proto!("health_v1");
}

use pb::health_server::{Health, HealthServer};
use pb::{Empty, Pong};

#[derive(Default)]
struct HealthSvc;

#[tonic::async_trait]
impl Health for HealthSvc {
    async fn ping(&self, _req: Request<Empty>) -> Result<Response<Pong>, Status> {
        Ok(Response::new(Pong {
            status: "ok".into(),
        }))
    }
}

pub async fn serve(addr: SocketAddr) -> Result<(), tonic::transport::Error> {
    Server::builder()
        .add_service(HealthServer::new(HealthSvc::default()))
        .serve(addr)
        .await
}
