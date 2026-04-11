-- Fix: "migration 20250411120003 was previously applied but is missing in the resolved migrations"
-- Run once against the same DATABASE_URL as the app (e.g. Neon SQL editor or psql).
-- Safe if that version was a renamed/removed file and the current schema already matches migrations 00–02, 04–05.

DELETE FROM _sqlx_migrations
WHERE version = 20250411120003;
