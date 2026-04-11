-- Pending borrow / custody requests (admin queue)
CREATE TABLE IF NOT EXISTS borrow_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id VARCHAR(128) NOT NULL REFERENCES admin_assets (id) ON DELETE CASCADE,
    requester_name TEXT NOT NULL,
    requester_email TEXT NOT NULL,
    requester_user_id UUID REFERENCES users (id) ON DELETE SET NULL,
    status VARCHAR(32) NOT NULL CHECK (status IN ('pending', 'approved', 'declined')),
    request_type VARCHAR(32) NOT NULL DEFAULT 'borrow',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_borrow_requests_status ON borrow_requests (status);

-- Dashboard / audit feed (denormalized for fast reads)
CREATE TABLE IF NOT EXISTS activity_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_name TEXT NOT NULL,
    actor_avatar_url TEXT NOT NULL DEFAULT '',
    action_summary TEXT NOT NULL,
    asset_id VARCHAR(128),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_events_created ON activity_events (created_at DESC);

-- Monthly aggregates for admin reports (checkout vs return)
CREATE TABLE IF NOT EXISTS monthly_asset_flow (
    year INT NOT NULL,
    month INT NOT NULL,
    checkouts INT NOT NULL DEFAULT 0,
    returns_count INT NOT NULL DEFAULT 0,
    PRIMARY KEY (year, month)
);

-- Singleton configuration (id must be 1)
CREATE TABLE IF NOT EXISTS platform_settings (
    id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    terms_text TEXT NOT NULL,
    maintenance_mode BOOLEAN NOT NULL DEFAULT false,
    core_version TEXT NOT NULL DEFAULT '0.1.0',
    last_backup_at TIMESTAMPTZ
);
