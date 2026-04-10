use crate::models::{Asset, AssetStatus, UserAsset, UserAssetStatus};

/// Domain / application service: owns asset-related rules and data access (in-memory for now).
pub struct AssetService {
    admin_assets: Vec<Asset>,
    user_assets: Vec<UserAsset>,
}

impl AssetService {
    pub fn new() -> Self {
        Self {
            admin_assets: vec![
                Asset {
                    id: "asset-001".into(),
                    name: r#"MacBook Pro 16" M3"#.into(),
                    serial_number: "8902-X-2024".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9RY0YJ6TZv9AZRRJjSySvi5HdmXuSlM_pk5B6y0KisO4xYaEahd8WQhqdNT_j7jjt42FP8mMldab4nPto-7KxEOc3op7I7zU-4M81l3DHy-QDmmhpdKtQyR7A5jOeHEvC6PeV-cZoqm9opfkR062fPcE6hPFOHfBRDzn2I5_OX7q5pE7EWm4w7IGphZIgx6oL5a-qaxVbXS0Tq2Av3poazwXy1gXOWaaXS1GQsbJ4bI9C3tr_Yo589VbXUHnHEm9uPr4VIPOoQ_c".into(),
                    status: AssetStatus::Assigned,
                    category: "Computing".into(),
                    custodian_name: Some("Sarah Jenkins".into()),
                    value_usd: 3499.0,
                },
                Asset {
                    id: "asset-002".into(),
                    name: "Phase One XF IQ4".into(),
                    serial_number: "CP-7721-P1".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBanDZ7ft8Y_IEt5gECzKVXxqxcG4tvmBH7ABrYQxxFUDQgVSiXwvXIjtNOHM7OqQMjG4VIUHrv2g5DLf7IpJXBRbo5AZ5UW3j7C50O1cNXRYZuCFTrEl13BERagNv7be5qB77cLY7FHpkeL83dDzvk8z0YbyOjiRQRZRE0AE8Hv8YAkUt1OFq3SaReKvfuWbqG_p0yvLNnd9mSs93C05DXAOYKKwwRfUyQOIRWyYq5UGHcvB8l3K8sm2caSAHvr50uhSV8ISeQSyE".into(),
                    status: AssetStatus::Available,
                    category: "Production".into(),
                    custodian_name: None,
                    value_usd: 48990.0,
                },
                Asset {
                    id: "asset-003".into(),
                    name: "SSL Fusion Outboard".into(),
                    serial_number: "AU-1122-SSL".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuADJWvdLjT9R8H8-o4DUV1kAiJa7c3fHCrVupVBOgPt8h8WKVYtz0Z0fpBy300eb1ufsGpbE0bvgBx_QoRYFuHqdc_4lZ-6Ngo5l07Vr8tOPR8Ibm0bQSFUzg2ZbOFWZyN7Zw1y2ezkws0PVs_s3cVV8N_7VrrhOMCckxogX0x-qStRk1nZig1QwwT17WAZyBAKRA4maG5hmfRXorNYkMP0-RJVMrqkHCZl7Zp7Zm51NEIfIMvziJH2VjyQUmzIoqQ5mfJSeA_P4hU".into(),
                    status: AssetStatus::Maintenance,
                    category: "Audio Hardware".into(),
                    custodian_name: Some("David Miller".into()),
                    value_usd: 2450.0,
                },
            ],
            user_assets: vec![
                UserAsset {
                    id: "asset-101".into(),
                    name: "ARRI Alexa Mini LF".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhdpPapBwpRxJjPuZ2i7R6WsAYZPH_aFl2mtujkMDnJ4J2jYcl9OZvpQvW5EFlQlZc01aBHEUZoPtw_l0JjEkc_UCwxZvXHSqeiJ2xBAadYBFtff1JtFdT26HaV--p5_REi-A_Kie1f7IcWMdgXy-P4b2wTYO0Mq5SCwJUU1jkYSyrU3cZKozdrOF0OKGS5wxehEjxgR9Ek6TpskghleB8Ztr3v7rZYDjmx9IBrruZL5gCsue1JHzeT01P1yexnALUaVS1TS2B_Kk".into(),
                    status: UserAssetStatus::Available,
                    category: "Production".into(),
                    location_label: "London, UK".into(),
                    daily_rate_usd: 450.0,
                    action_label: "Request Asset".into(),
                },
                UserAsset {
                    id: "asset-102".into(),
                    name: "MacBook Pro M3 Max".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuARTKFDSfOMCnp4fEmkFBe9K-2WuJCDl5VpgmQ3O07ltruO3pv_eBanukJMYocuJbRUHOyRM1ThHkJbDDn9sveGWqJ33wQTvMa4V5bUWhNSn9T2TsN3l86nWDpi0ZkBonyYrRScNQlKcRPyTsKE_hIDARCbsStGSOrPsw98XoXMqTqF8qMdoMuBIRL5e6fZzIBHjdlS3JoLypOyN2znqFKp2NK_ECdTf274E41hVyp6BipzXdWuCxel5gwW97gjNiSSY1iPLjCV1ac".into(),
                    status: UserAssetStatus::Borrowed,
                    category: "Computing".into(),
                    location_label: "New York, USA".into(),
                    daily_rate_usd: 120.0,
                    action_label: "View Details".into(),
                },
                UserAsset {
                    id: "asset-103".into(),
                    name: "Profoto D2 Duo Kit".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIAQdzjw12C-XHTTH_kjvUKoS9Vnlz0KoeigYadOkJu3_ldj306546dUOVYQUV6O-SMpuxtMYEkxh95hX3KrGzKDWMyViMhjGBTiDbyYVuDGaobwiJ2QahEXpe61avKADFr8_ENSSKGIPnGqafh3kyNBWC2ome4uE8acNHxneVtgqueoUKF67qtFB6f5r5TwkFKQfD7Ka3WDG5yxVUya8fennUBHBW2mNJIZu4oIHp0UTqM5kI1p-nB9qnVpzHXwk8M5A6vmtbFOk".into(),
                    status: UserAssetStatus::Reserved,
                    category: "Production".into(),
                    location_label: "Berlin, DE".into(),
                    daily_rate_usd: 200.0,
                    action_label: "Notify When Free".into(),
                },
                UserAsset {
                    id: "asset-104".into(),
                    name: "DJI Inspire 3 Combo".into(),
                    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC0UHQDOlidDuH8_VI98nxbTsSOrjhIQSzhj1V-tnldiASSL2HuimB9rxK3qXV2SXvGd_zxO8g9ieQnPGZwvfkH2iVcOjvoOZXMCA777LoVG1EldEQiGwt5prkC6hDMawK5cb-XPlABXy3yjeTvgbaTwWkkdP-n9YHdktR-oHlxdFo2JBJXhFDdy0zx1IWW_GOY_cYxqPNG3oMwy_NuiW1SnJCdwK_Kh_e8sRFudo5gbQiyle6aYS1dbpOW3trSZ1YaBYRnvbdROA".into(),
                    status: UserAssetStatus::InTransit,
                    category: "Production".into(),
                    location_label: "Arriving Today".into(),
                    daily_rate_usd: 380.0,
                    action_label: "Track Shipment".into(),
                },
            ],
        }
    }

    pub fn list_admin_assets(&self) -> Vec<Asset> {
        self.admin_assets.clone()
    }

    pub fn list_user_dashboard_assets(&self) -> Vec<UserAsset> {
        self.user_assets.clone()
    }

    pub fn get_user_asset(&self, id: &str) -> Option<UserAsset> {
        self.user_assets.iter().find(|a| a.id == id).cloned()
    }

    pub fn list_similar_user_assets(&self, limit: usize) -> Vec<UserAsset> {
        self.user_assets.iter().take(limit).cloned().collect()
    }
}

impl Default for AssetService {
    fn default() -> Self {
        Self::new()
    }
}
