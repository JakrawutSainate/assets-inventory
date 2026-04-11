-- Seed demo data (same as former in-memory fixtures)
INSERT INTO admin_assets (id, name, serial_number, image_url, status, category, custodian_name, value_usd)
VALUES
(
    'asset-001',
    $$MacBook Pro 16" M3$$,
    '8902-X-2024',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9RY0YJ6TZv9AZRRJjSySvi5HdmXuSlM_pk5B6y0KisO4xYaEahd8WQhqdNT_j7jjt42FP8mMldab4nPto-7KxEOc3op7I7zU-4M81l3DHy-QDmmhpdKtQyR7A5jOeHEvC6PeV-cZoqm9opfkR062fPcE6hPFOHfBRDzn2I5_OX7q5pE7EWm4w7IGphZIgx6oL5a-qaxVbXS0Tq2Av3poazwXy1gXOWaaXS1GQsbJ4bI9C3tr_Yo589VbXUHnHEm9uPr4VIPOoQ_c',
    'assigned',
    'Computing',
    'Sarah Jenkins',
    3499.0
),
(
    'asset-002',
    'Phase One XF IQ4',
    'CP-7721-P1',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBanDZ7ft8Y_IEt5gECzKVXxqxcG4tvmBH7ABrYQxxFUDQgVSiXwvXIjtNOHM7OqQMjG4VIUHrv2g5DLf7IpJXBRbo5AZ5UW3j7C50O1cNXRYZuCFTrEl13BERagNv7be5qB77cLY7FHpkeL83dDzvk8z0YbyOjiRQRZRE0AE8Hv8YAkUt1OFq3SaReKvfuWbqG_p0yvLNnd9mSs93C05DXAOYKKwwRfUyQOIRWyYq5UGHcvB8l3K8sm2caSAHvr50uhSV8ISeQSyE',
    'available',
    'Production',
    NULL,
    48990.0
),
(
    'asset-003',
    'SSL Fusion Outboard',
    'AU-1122-SSL',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuADJWvdLjT9R8H8-o4DUV1kAiJa7c3fHCrVupVBOgPt8h8WKVYtz0Z0fpBy300eb1ufsGpbE0bvgBx_QoRYFuHqdc_4lZ-6Ngo5l07Vr8tOPR8Ibm0bQSFUzg2ZbOFWZyN7Zw1y2ezkws0PVs_s3cVV8N_7VrrhOMCckxogX0x-qStRk1nZig1QwwT17WAZyBAKRA4maG5hmfRXorNYkMP0-RJVMrqkHCZl7Zp7Zm51NEIfIMvziJH2VjyQUmzIoqQ5mfJSeA_P4hU',
    'maintenance',
    'Audio Hardware',
    'David Miller',
    2450.0
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_assets (id, name, image_url, status, category, location_label, daily_rate_usd, action_label)
VALUES
(
    'asset-101',
    'ARRI Alexa Mini LF',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhdpPapBwpRxJjPuZ2i7R6WsAYZPH_aFl2mtujkMDnJ4J2jYcl9OZvpQvW5EFlQlZc01aBHEUZoPtw_l0JjEkc_UCwxZvXHSqeiJ2xBAadYBFtff1JtFdT26HaV--p5_REi-A_Kie1f7IcWMdgXy-P4b2wTYO0Mq5SCwJUU1jkYSyrU3cZKozdrOF0OKGS5wxehEjxgR9Ek6TpskghleB8Ztr3v7rZYDjmx9IBrruZL5gCsue1JHzeT01P1yexnALUaVS1TS2B_Kk',
    'available',
    'Production',
    'London, UK',
    450.0,
    'Request Asset'
),
(
    'asset-102',
    'MacBook Pro M3 Max',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuARTKFDSfOMCnp4fEmkFBe9K-2WuJCDl5VpgmQ3O07ltruO3pv_eBanukJMYocuJbRUHOyRM1ThHkJbDDn9sveGWqJ33wQTvMa4V5bUWhNSn9T2TsN3l86nWDpi0ZkBonyYrRScNQlKcRPyTsKE_hIDARCbsStGSOrPsw98XoXMqTqF8qMdoMuBIRL5e6fZzIBHjdlS3JoLypOyN2znqFKp2NK_ECdTf274E41hVyp6BipzXdWuCxel5gwW97gjNiSSY1iPLjCV1ac',
    'borrowed',
    'Computing',
    'New York, USA',
    120.0,
    'View Details'
),
(
    'asset-103',
    'Profoto D2 Duo Kit',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAQdzjw12C-XHTTH_kjvUKoS9Vnlz0KoeigYadOkJu3_ldj306546dUOVYQUV6O-SMpuxtMYEkxh95hX3KrGzKDWMyViMhjGBTiDbyYVuDGaobwiJ2QahEXpe61avKADFr8_ENSSKGIPnGqafh3kyNBWC2ome4uE8acNHxneVtgqueoUKF67qtFB6f5r5TwkFKQfD7Ka3WDG5yxVUya8fennUBHBW2mNJIZu4oIHp0UTqM5kI1p-nB9qnVpzHXwk8M5A6vmtbFOk',
    'reserved',
    'Production',
    'Berlin, DE',
    200.0,
    'Notify When Free'
),
(
    'asset-104',
    'DJI Inspire 3 Combo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0UHQDOlidDuH8_VI98nxbTsSOrjhIQSzhj1V-tnldiASSL2HuimB9rxK3qXV2SXvGd_zxO8g9ieQnPGZwvfkH2iVcOjvoOZXMCA777LoVG1EldEQiGwt5prkC6hDMawK5cb-XPlABXy3yjeTvgbaTwWkkdP-n9YHdktR-oHlxdFo2JBJXhFDdy0zx1IWW_GOY_cYxqPNG3oMwy_NuiW1SnJCdwK_Kh_e8sRFudo5gbQiyle6aYS1dbpOW3trSZ1YaBYRnvbdROA',
    'in_transit',
    'Production',
    'Arriving Today',
    380.0,
    'Track Shipment'
)
ON CONFLICT (id) DO NOTHING;
