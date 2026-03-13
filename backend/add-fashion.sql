-- 7. FASHION (Category 13: Clothing & Accessories)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(98, 13, 'Symbol Premium Men''s Shirt', 'High-quality premium cotton shirt for formal and semi-formal occasions.', 1499.00, 100, 4.4, 320, '{"Material": "100% Cotton", "Fit": "Slim Fit", "Sleeve": "Full"}'),
(99, 13, 'UB Unity Brand Unisex Hoodie', 'Comfortable and stylish hoodie with a soft inner lining.', 1299.00, 80, 4.3, 150, '{"Material": "Fleece", "Type": "Hoodie", "Gender": "Unisex"}'),
(100, 13, 'Aatman Ethnic Wear Kurta', 'Traditional ethnic kurta perfect for festivals and weddings.', 1899.00, 60, 4.5, 85, '{"Material": "Silk Blend", "Type": "Kurta", "Occasion": "Festive"}'),
(101, 13, 'Boldfit Compression Tights', 'Professional grade compression tights for sports and gym.', 899.00, 150, 4.6, 950, '{"Material": "Spandex/Polyester", "Use": "Sports", "Type": "Compression"}'),
(102, 13, 'KLOSIA Printed Kurta Set', 'Beautifully printed kurta set with matching pants and dupatta.', 2199.00, 40, 4.4, 210, '{"Material": "Rayon", "Type": "Kurta Set", "Focus": "Floral Print"}'),
(103, 13, 'GoSriKi Women''s Cotton Saree', 'Traditional cotton saree with elegant border design.', 1599.00, 35, 4.2, 560, '{"Material": "Cotton", "Length": "6 Meters", "Included": "Blouse Piece"}'),
(104, 13, 'KLOSIA Embroidered Suit', 'Heavy embroidered suit set for special occasions.', 2899.00, 25, 4.7, 45, '{"Work": "Embroidery", "Type": "Suit Set", "Material": "Crepe"}'),
(105, 13, 'KOTTY Solid Men''s T-Shirt', 'Classic solid color t-shirt for everyday wear.', 499.00, 200, 4.1, 1200, '{"Material": "Cotton Blend", "Neck": "Round Neck", "Sleeve": "Half"}'),
(106, 13, 'Pashmoda Premium Shawl', 'Exquisite pashmina-style shawl with intricate patterns.', 3500.00, 15, 4.8, 30, '{"Material": "Wool Blend", "Type": "Shawl", "Work": "Kani"}'),
(107, 13, 'GRECIILOOKS Casual Top', 'Trendy casual top for women with modern cut.', 799.00, 120, 4.2, 340, '{"Material": "Georgette", "Type": "Top", "Fit": "Regular"}'),
(108, 13, 'Jockey Men''s Cotton Vest', 'Ultimate comfort and breathability with Jockey vests.', 299.00, 500, 4.6, 8900, '{"Brand": "Jockey", "Material": "Super Combed Cotton", "Type": "Vest"}'),
(109, 13, 'Van Heusen Formal Trousers', 'Sharp formal trousers with a clean fall and fit.', 1899.00, 70, 4.5, 1200, '{"Brand": "Van Heusen", "Material": "Poly-Viscose", "Fit": "Custom"}'),
(110, 13, 'GoSriKi Straight Kurta Set', 'Comfortable straight-cut kurta set for daily office wear.', 1299.00, 90, 4.3, 740, '{"Type": "Straight Cut", "Material": "Cotton", "Neck": "V-Neck"}'),
(111, 13, 'Amazon Brand - Symbol Jacket', 'Stylish lightweight jacket for mild winter and outdoors.', 2499.00, 55, 4.4, 150, '{"Brand": "Symbol", "Type": "Lightweight Jacket", "Pockets": "4"}'),
(112, 13, 'Lymio Stylish One Piece Dress', 'Fashionable one-piece dress for parties and outings.', 1599.00, 45, 4.3, 95, '{"Type": "One Piece", "Material": "Rayon", "Length": "Knee Length"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(98, 'https://m.media-amazon.com/images/I/71ob8wm0+3L._AC_SL1500_.jpg', TRUE),
(99, 'https://m.media-amazon.com/images/I/61pLOtTU2VL._AC_SL1500_.jpg', TRUE),
(100, 'https://m.media-amazon.com/images/I/71JmEVk0-4L._AC_SL1500_.jpg', TRUE),
(101, 'https://m.media-amazon.com/images/I/61PG99vAZdL._AC_SL1500_.jpg', TRUE),
(102, 'https://m.media-amazon.com/images/I/51JtGs04X7L._AC_SL1500_.jpg', TRUE),
(103, 'https://m.media-amazon.com/images/I/71mX4WATh-L._AC_SL1500_.jpg', TRUE),
(104, 'https://m.media-amazon.com/images/I/71DCFWHFolL._AC_SL1500_.jpg', TRUE),
(105, 'https://m.media-amazon.com/images/I/61dFcpPdJkL._AC_SL1500_.jpg', TRUE),
(106, 'https://m.media-amazon.com/images/I/71gn7SOGs+L._AC_SL1500_.jpg', TRUE),
(107, 'https://m.media-amazon.com/images/I/51efXl8NOnL._AC_SL1500_.jpg', TRUE),
(108, 'https://m.media-amazon.com/images/I/61xidlWeNhL._AC_SL1500_.jpg', TRUE),
(109, 'https://m.media-amazon.com/images/I/61QU0Hj1irL._AC_SL1500_.jpg', TRUE),
(110, 'https://m.media-amazon.com/images/I/71a0THblX5L._AC_SL1500_.jpg', TRUE),
(111, 'https://m.media-amazon.com/images/I/713n+TxyfCL._AC_SL1500_.jpg', TRUE),
(112, 'https://m.media-amazon.com/images/I/71qJNrZhd1L._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
