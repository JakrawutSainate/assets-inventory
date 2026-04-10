//! gRPC asset API — shared by `runner` and the `asset-grpc` binary.

use std::net::SocketAddr;
use std::sync::Arc;

use common::models::{Asset, AssetStatus, UserAsset, UserAssetStatus};
use common::services::AssetService;
use tonic::{transport::Server, Request, Response, Status};

pub mod pb {
    tonic::include_proto!("asset_v1");
}

use pb::asset_service_server::{AssetService as AssetServiceTrait, AssetServiceServer};
use pb::{
    AdminAsset, AssetStatus as PbAssetStatus, Empty, GetUserAssetReply, GetUserAssetRequest,
    ListAdminAssetsReply, ListDashboardAssetsReply, ListSimilarAssetsReply, UserAsset as PbUserAsset,
    UserAssetStatus as PbUserStatus,
};

#[derive(Clone)]
struct AssetGrpc {
    inner: Arc<AssetService>,
}

#[tonic::async_trait]
impl AssetServiceTrait for AssetGrpc {
    async fn list_admin_assets(
        &self,
        _req: Request<Empty>,
    ) -> Result<Response<ListAdminAssetsReply>, Status> {
        let items = self
            .inner
            .list_admin_assets()
            .into_iter()
            .map(to_pb_admin)
            .collect();
        Ok(Response::new(ListAdminAssetsReply { items }))
    }

    async fn list_dashboard_assets(
        &self,
        _req: Request<Empty>,
    ) -> Result<Response<ListDashboardAssetsReply>, Status> {
        let items = self
            .inner
            .list_user_dashboard_assets()
            .iter()
            .map(to_pb_user)
            .collect();
        Ok(Response::new(ListDashboardAssetsReply { items }))
    }

    async fn get_user_asset(
        &self,
        req: Request<GetUserAssetRequest>,
    ) -> Result<Response<GetUserAssetReply>, Status> {
        let id = req.into_inner().id;
        let asset = self.inner.get_user_asset(&id).map(|a| to_pb_user(&a));
        Ok(Response::new(GetUserAssetReply { asset }))
    }

    async fn list_similar_assets(
        &self,
        _req: Request<Empty>,
    ) -> Result<Response<ListSimilarAssetsReply>, Status> {
        let items = self
            .inner
            .list_similar_user_assets(3)
            .iter()
            .map(to_pb_user)
            .collect();
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

pub async fn serve(
    addr: SocketAddr,
    assets: Arc<AssetService>,
) -> Result<(), tonic::transport::Error> {
    let svc = AssetGrpc { inner: assets };
    Server::builder()
        .add_service(AssetServiceServer::new(svc))
        .serve(addr)
        .await
}
