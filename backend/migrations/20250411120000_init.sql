-- Admin registry (aligned with common::models::Asset)
CREATE TABLE IF NOT EXISTS admin_assets (
    id VARCHAR(128) PRIMARY KEY,
    name TEXT NOT NULL,
    serial_number TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status VARCHAR(32) NOT NULL,
    category TEXT NOT NULL,
    custodian_name TEXT,
    value_usd DOUBLE PRECISION NOT NULL
);

-- User-facing cards (aligned with common::models::UserAsset)
CREATE TABLE IF NOT EXISTS user_assets (
    id VARCHAR(128) PRIMARY KEY,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status VARCHAR(32) NOT NULL,
    category TEXT NOT NULL,
    location_label TEXT NOT NULL,
    daily_rate_usd DOUBLE PRECISION NOT NULL,
    action_label TEXT NOT NULL
);
