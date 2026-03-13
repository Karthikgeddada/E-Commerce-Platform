-- 10. GARDEN & OUTDOORS (Category 19: Garden & Outdoors)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(148, 19, 'BonKaso Garden Tool Set', 'Comprehensive garden tool set for all your planting needs.', 899.00, 50, 4.4, 120, '{"Tools": "6 Pcs", "Material": "Steel", "Brand": "BonKaso"}'),
(149, 19, 'DELIXI Garden Pruning Shears', 'Ultra-sharp bypass pruning shears for clean cuts.', 499.00, 100, 4.5, 320, '{"Type": "Pruning Shears", "Brand": "DELIXI", "Blade": "Carbon Steel"}'),
(150, 19, 'KELVINN Garden Sprayer', 'High-pressure garden water sprayer for watering plants.', 349.00, 150, 4.2, 560, '{"Type": "Pressure Sprayer", "Capacity": "2L", "Material": "Plastic"}'),
(151, 19, 'UGAOO Indoor Succulent Mix', 'Premium organic soil mix for healthy indoor succulents.', 299.00, 200, 4.7, 850, '{"Brand": "UGAOO", "Weight": "1kg", "Type": "Organic"}'),
(152, 19, 'Imou Outdoor Security Camera', 'Weatherproof smart security camera with night vision.', 3499.00, 30, 4.6, 210, '{"Brand": "Imou", "Resolution": "1080p", "Weatherproof": "IP67"}'),
(153, 19, 'Qubo Smart Outdoor Camera', 'Secure your home with the Qubo smart outdoor monitoring.', 3299.00, 40, 4.5, 150, '{"Brand": "Qubo", "Feature": "AI Person Detection"}'),
(154, 19, 'Lotey Hanging Planters', 'Elegant indoor/outdoor hanging pots for home decor.', 595.00, 80, 4.3, 340, '{"Count": "2 Pcs", "Material": "Plastic", "Style": "Hanging"}'),
(155, 19, 'TP-Link Tapo Smart Camera', 'Smart Wi-Fi outdoor security camera with voice control.', 2899.00, 60, 4.4, 950, '{"Brand": "TP-Link", "Series": "Tapo", "Resolution": "2K"}'),
(156, 19, 'XIAOMI Smart Home Hub', 'Connect and control all your smart home devices easily.', 2499.00, 55, 4.5, 320, '{"Brand": "XIAOMI", "Connectivity": "Zigbee/Wi-Fi", "Focus": "Smart Home"}'),
(157, 19, 'Furniture Patio Garden Wicker Set', '2 Chair 1 Square Table Sets. Powder Coated Frame, UV Protected Wicker.', 12500.00, 10, 4.8, 45, '{"Parts": "3 (2 Chairs, 1 Table)", "Material": "Wicker", "Color": "Dark Brown"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(148, 'https://m.media-amazon.com/images/I/61ZSHY1wIhL._AC_SL1500_.jpg', TRUE),
(149, 'https://m.media-amazon.com/images/I/51cxMHaAe0L._AC_SL1500_.jpg', TRUE),
(150, 'https://m.media-amazon.com/images/I/51IJwq7LvCL._AC_SL1500_.jpg', TRUE),
(151, 'https://m.media-amazon.com/images/I/91BPj45HluL._AC_SL1500_.jpg', TRUE),
(152, 'https://m.media-amazon.com/images/I/614q1ArWLAL._AC_SL1500_.jpg', TRUE),
(153, 'https://m.media-amazon.com/images/I/71w-d4gcI-L._AC_SL1500_.jpg', TRUE),
(154, 'https://m.media-amazon.com/images/I/61LZzoq3UVL._AC_SL1500_.jpg', TRUE),
(155, 'https://m.media-amazon.com/images/I/51h3W2diWKL._AC_SL1500_.jpg', TRUE),
(156, 'https://m.media-amazon.com/images/I/81wYKP3G7AL._AC_SL1500_.jpg', TRUE),
(157, 'https://m.media-amazon.com/images/I/61fLWe03R7L._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
