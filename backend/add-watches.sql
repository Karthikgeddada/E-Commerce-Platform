-- 8. WATCHES (Category 44: Watches)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(113, 44, 'Carlington Elite Analog Watch', 'Sleek and professional analog watch for men with a premium finish.', 1899.00, 50, 4.3, 120, '{"Type": "Analog", "Brand": "Carlington", "Water Resistant": "30m"}'),
(114, 44, 'GOBOULT Smart Watch', 'High-performance smart watch with health tracking and multiple sports modes.', 2499.00, 100, 4.5, 320, '{"Type": "Smart", "Features": "SpO2, Heart Rate", "Display": "1.69 inch"}'),
(115, 44, 'Daniel Hechter Paris Analog Watch', 'Elegant Parisian design analog watch for formal wear.', 3499.00, 30, 4.6, 85, '{"Brand": "Daniel Hechter", "Movement": "Quartz", "Dial": "Blue"}'),
(116, 44, 'Daniel Hechter Chronograph Watch', 'Sporty chronograph watch with multi-function sub-dials.', 4899.00, 20, 4.7, 45, '{"Type": "Chronograph", "Movement": "Japan Movement", "Strap": "Leather"}'),
(117, 44, 'Titan Neo Analog Blue Dial Watch', 'Classic Titan Neo series with a modern blue dial and leather strap.', 5499.00, 40, 4.8, 1200, '{"Brand": "Titan", "Series": "Neo", "Dial Color": "Blue"}'),
(118, 44, 'Casio Enticer Men''s Watch', 'Durable and stylish analog watch for professional daily use.', 2995.00, 75, 4.6, 2100, '{"Brand": "Casio", "Series": "Enticer", "Case": "Stainless Steel"}'),
(119, 44, 'Titan Karishma Revive Watch', 'Elegance redefined with the Karishma collection.', 3895.00, 35, 4.5, 560, '{"Brand": "Titan", "Series": "Karishma", "Design": "Traditional"}'),
(120, 44, 'Fossil Gen 6 Hybrid Smartwatch', 'The best of both worlds: analog looks with smartwatch features.', 18495.00, 15, 4.4, 230, '{"Brand": "Fossil", "Type": "Hybrid", "Battery": "Up to 2 weeks"}'),
(121, 44, 'Titan Raga Viva Women''s Watch', 'Designer watch for women inspired by the grace of nature.', 4995.00, 25, 4.7, 890, '{"Brand": "Titan", "Series": "Raga", "Collection": "Viva"}'),
(122, 44, 'Matrix Analog Pair Watches', 'Perfect matching pair watches for couples.', 1599.00, 50, 4.2, 145, '{"Brand": "Matrix", "Type": "Pair", "Gift": "Couple Set"}'),
(123, 44, 'Daniel Hechter Classic Leather Watch', 'Timeless leather strap watch with a clean white dial.', 3199.00, 30, 4.5, 95, '{"Brand": "Daniel Hechter", "Strap": "Brown Leather", "Dial": "White"}'),
(124, 44, 'Casio Vintage Digital Silver', 'Retro digital design in a modern silver stainless steel finish.', 1695.00, 60, 4.6, 4500, '{"Brand": "Casio", "Series": "Vintage", "Finish": "Silver"}'),
(125, 44, 'Titan Workwear Watch', 'Designed for the modern professional work life.', 2895.00, 80, 4.4, 340, '{"Brand": "Titan", "Category": "Workwear", "Strap": "Black Metal"}'),
(126, 44, 'Noise ColorFit Ultra Smartwatch', 'Large display smartwatch with 60+ sports modes.', 3299.00, 120, 4.3, 15000, '{"Brand": "Noise", "Model": "ColorFit Ultra", "Display": "1.75 inch"}'),
(127, 44, 'Acnos Premium Men''s Watch', 'Affordable luxury analog watch for daily style.', 699.00, 200, 4.1, 740, '{"Brand": "Acnos", "Type": "Analog", "Material": "Stainless Steel"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(113, 'https://m.media-amazon.com/images/I/61dywKQasaL._AC_SL1500_.jpg', TRUE),
(114, 'https://m.media-amazon.com/images/I/61Xe3o3IwSL._AC_SL1500_.jpg', TRUE),
(115, 'https://m.media-amazon.com/images/I/61sICrZSBuL._AC_SL1500_.jpg', TRUE),
(116, 'https://m.media-amazon.com/images/I/71EJIjkeo+L._AC_SL1500_.jpg', TRUE),
(117, 'https://m.media-amazon.com/images/I/61AUHA1rnYL._AC_SL1500_.jpg', TRUE),
(118, 'https://m.media-amazon.com/images/I/61ybeKQto8L._AC_SL1500_.jpg', TRUE),
(119, 'https://m.media-amazon.com/images/I/51ykbSj-eoL._AC_SL1500_.jpg', TRUE),
(120, 'https://m.media-amazon.com/images/I/71taSx89wUL._AC_SL1500_.jpg', TRUE),
(121, 'https://m.media-amazon.com/images/I/61LXKWOKeQL._AC_SL1500_.jpg', TRUE),
(122, 'https://m.media-amazon.com/images/I/816eXKgDfIL._AC_SL1500_.jpg', TRUE),
(123, 'https://m.media-amazon.com/images/I/71Ozj5O+fEL._AC_SL1500_.jpg', TRUE),
(124, 'https://m.media-amazon.com/images/I/61uhhnPo9dL._AC_SL1500_.jpg', TRUE),
(125, 'https://m.media-amazon.com/images/I/51H6UStOzsL._AC_SL1500_.jpg', TRUE),
(126, 'https://m.media-amazon.com/images/I/81oS2scJ5GL._AC_SL1500_.jpg', TRUE),
(127, 'https://m.media-amazon.com/images/I/61M32OHXQ1L._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
