-- 6. SHOES (Category 36: Shoes & Handbags)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(83, 36, 'Centrino Men''s Formal Shoes', 'Classic derby lace-up formal shoes for office and parties.', 1299.00, 50, 4.2, 450, '{"Material": "Synthetic", "Type": "Derby", "Sole": "PVC"}'),
(84, 36, 'BRUTE Sports Shoes for Men', 'High-performance running and training sports shoes.', 1599.00, 40, 4.3, 320, '{"Type": "Sports", "Brand": "BRUTE", "Sole": "Phylon"}'),
(85, 36, 'Centrino Casual Loafers', 'Stylish slip-on loafers for everyday comfort.', 999.00, 60, 4.1, 560, '{"Type": "Loafer", "Material": "Synthetic", "Closure": "Slip-on"}'),
(86, 36, 'Boldfit Gym & Training Shoes', 'Lightweight breathable shoes for gym workouts.', 1899.00, 30, 4.5, 120, '{"Brand": "Boldfit", "Use": "Gym", "Material": "Mesh"}'),
(87, 36, 'DRACKFOOT Trekking Shoes', 'Durable outdoor trekking and hiking boots.', 2499.00, 25, 4.4, 230, '{"Type": "Trekking", "Waterproof": "Yes", "Ankle": "High"}'),
(88, 36, 'DRACKFOOT Desert Boots', 'Stylish suede desert boots for casual wear.', 2199.00, 35, 4.3, 110, '{"Material": "Suede", "Type": "Boot", "Sole": "Rubber"}'),
(89, 36, 'GENERIC Men''s Sneakers', 'Trendy white sneakers for a clean look.', 799.00, 100, 4.0, 890, '{"Type": "Sneaker", "Color": "White", "Material": "PU"}'),
(90, 36, 'Mytaco Fashion Slides', 'Comfortable and lightweight everyday slides.', 399.00, 150, 4.2, 45, '{"Type": "Slide", "Material": "Eva", "Waterproof": "Yes"}'),
(91, 36, 'HotStyle Party Wear Shoes', 'Dashing party wear shoes with a glossy finish.', 1899.00, 20, 4.1, 75, '{"Type": "Party Wear", "Finish": "Glossy", "Sole": "TPR"}'),
(92, 36, 'Generic Running Shoes', 'Affordable lightweight shoes for daily jogging.', 699.00, 120, 3.9, 1200, '{"Type": "Running", "Sole": "Eva", "Breathable": "Yes"}'),
(93, 36, 'SPARX Men''s Sports Shoes', 'Durable and reliable sports shoes from SPARX.', 1295.00, 80, 4.4, 3400, '{"Brand": "SPARX", "Type": "Sports", "Sole": "TPR"}'),
(94, 36, 'Liberty Men''s Casual Shoes', 'High-quality casual shoes for a smart appearance.', 1499.00, 45, 4.2, 950, '{"Brand": "Liberty", "Type": "Casual", "Material": "Synthetic"}'),
(95, 36, 'SPARX Walking Shoes', 'Comfortable walking shoes with great grip.', 1199.00, 70, 4.3, 1500, '{"Brand": "SPARX", "Use": "Walking", "Sole": "Phylon"}'),
(96, 36, 'Centrino Oxford formal Shoes', 'Premium lace-up oxford shoes for business attire.', 1699.00, 30, 4.5, 210, '{"Type": "Oxford", "Material": "Synthetic Patent", "Sole": "PVC"}'),
(97, 36, 'Bata Men''s Comfit Sandals', 'Classic Bata sandals for ultimate comfort.', 999.00, 100, 4.6, 5600, '{"Brand": "Bata", "Type": "Sandal", "Comfort": "Extra Cushion"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(83, 'https://m.media-amazon.com/images/I/717SJzr4riS._AC_SL1500_.jpg', TRUE),
(84, 'https://m.media-amazon.com/images/I/71TIRRAtbbL._AC_SL1500_.jpg', TRUE),
(85, 'https://m.media-amazon.com/images/I/71pf57OgdvL._AC_SL1500_.jpg', TRUE),
(86, 'https://m.media-amazon.com/images/I/618q543WyWL._AC_SL1500_.jpg', TRUE),
(87, 'https://m.media-amazon.com/images/I/71kbwjTIMDL._AC_SL1500_.jpg', TRUE),
(88, 'https://m.media-amazon.com/images/I/51M92AO0T9L._AC_SL1500_.jpg', TRUE),
(89, 'https://m.media-amazon.com/images/I/51hmXQ3rIOL._AC_SL1500_.jpg', TRUE),
(90, 'https://m.media-amazon.com/images/I/31FGn3FjQ5L._AC_SL1500_.jpg', TRUE),
(91, 'https://m.media-amazon.com/images/I/41I4qSMvsGL._AC_SL1500_.jpg', TRUE),
(92, 'https://m.media-amazon.com/images/I/81AMhm0Wu1L._AC_SL1500_.jpg', TRUE),
(93, 'https://m.media-amazon.com/images/I/61dgP8XDIoL._AC_SL1500_.jpg', TRUE),
(94, 'https://m.media-amazon.com/images/I/51eWVlXLFuL._AC_SL1500_.jpg', TRUE),
(95, 'https://m.media-amazon.com/images/I/71BgT0PmeSL._AC_SL1500_.jpg', TRUE),
(96, 'https://m.media-amazon.com/images/I/6LeRV26ylL._AC_SL1500_.jpg', TRUE),
(97, 'https://m.media-amazon.com/images/I/51rDSWoxjyL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
