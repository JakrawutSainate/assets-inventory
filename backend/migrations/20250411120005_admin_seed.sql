INSERT INTO platform_settings (id, terms_text, maintenance_mode, core_version, last_backup_at)
VALUES (
    1,
    'Users must treat all assets with care and report damage within 24 hours.',
    false,
    '0.1.0',
    now() - interval '2 hours 14 minutes'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO monthly_asset_flow (year, month, checkouts, returns_count)
VALUES
    (2025, 10, 42, 38),
    (2025, 11, 55, 48),
    (2025, 12, 78, 62),
    (2026, 1, 64, 58),
    (2026, 2, 71, 65),
    (2026, 3, 82, 70),
    (2026, 4, 56, 44)
ON CONFLICT (year, month) DO NOTHING;

INSERT INTO activity_events (id, actor_name, actor_avatar_url, action_summary, asset_id, created_at)
VALUES
(
    'a1111111-1111-4111-8111-111111111111',
    'Sarah Chen',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAZn3V8DspgnBPBj4L7tDCefaNSAmrN6IlHbD29yvFoz5sUW2cx1uBt11578o5vEDULqPzLgY4bJx8sx_Gk7oB-t8SIEgqdBmS3p5OnOxgmuVI_vCJtyfL1FlpQ26o4RZ9iV1YEKbF6DmL_Z_O6YuEiicDdKFTbu9zXEf4AoBPF-Wqlroeflq8s7IB_8RdZHmGeDxE30puGmr-XYxZwj1veWClp8zUO9j5EwQpMenMHsVzRkPK3pLg2gRj3nRJvsOS_K1AZHyGCTis',
    'Borrowed ARRI Alexa Mini LF',
    'asset-101',
    now() - interval '2 minutes'
),
(
    'a2222222-2222-4222-8222-222222222222',
    'David Miller',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDF7f2KB88WTa5rTeeVJ5-L_lV3i2OEO2_4h8gkb__qnwlOVNIIBM-Av_pGSCz_rOaKdJu9lG3kRHqgWxzkadSTEhkCr0Urcu08kPtmnKoYoP0_nDpdSfDc60GBP0ACbCI6UiDZAviCL9LArlySlt4qpUxetfmX920E6iOVQLzRd574jJcrXBPycqkH67Hg52YUpb8TF5Y4V2ZuZu4TiDjnWviwFZbmBwcVjJAYwCF75nogvWHD7aB3LsWyDSaCdtgw_dkojyHeK7E',
    'Returned MacBook Pro M3 Max',
    'asset-102',
    now() - interval '14 minutes'
),
(
    'a3333333-3333-4333-8333-333333333333',
    'Elena Rodriguez',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAULpGiJOOkTXhkYRbLdGqn3eT2sEXZiPd9VSRzz-OurnsptE-fcD5LktcUVFTzviqKUo2LH-ULHPV-1MbmIHpqJkJUi3r-_7Kgj5gshl4cUJPTIMniTBVrvdNAEsjwxHk7emH_Cj2V9HYpQkSnYz59xZVsHhLA0q3tDFT3fpUQMuOXzwIbBVL0HiOei_EfllObXBxBY2b-S9rO4H_nR4TpLh4napyQ_MgmzuLYeqg5pFcW-poxvo0k0xUMmOYuSIhGvk1asbMbtBQ',
    'Borrowed Profoto D2 Duo Kit',
    'asset-103',
    now() - interval '42 minutes'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO borrow_requests (id, asset_id, requester_name, requester_email, status, request_type)
VALUES
(
    'b1111111-1111-4111-8111-111111111111',
    'asset-001',
    'Alex Sterling',
    'alex@fluid-custodian.com',
    'pending',
    'borrow'
),
(
    'b2222222-2222-4222-8222-222222222222',
    'asset-002',
    'Alex Sterling',
    'alex@fluid-custodian.com',
    'pending',
    'borrow'
)
ON CONFLICT (id) DO NOTHING;
