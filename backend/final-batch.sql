-- FINAL BATCH: BOOKS, SHOES, FASHION, WATCHES

-- 1. BOOKS (Category 11) - Starting from ID 75
-- Update ID 11
UPDATE products SET name = 'The Psychology of Money', description = 'Timeless lessons on wealth, greed, and happiness.', price = 350.00 WHERE id = 11;
UPDATE product_images SET image_url = 'https://m.media-amazon.com/images/I/71XEsXS5RlL._AC_SL1500_.jpg' WHERE product_id = 11 AND is_primary = TRUE;

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(75, 11, 'Human Edge in the AI Age', 'Eight Timeless Mantras for Success by the Bestselling Author.', 499.00, 100, 4.8, 150, '{"Author": "Various", "Topic": "AI & Success"}'),
(76, 11, 'World''s Greatest Books For Personal Growth (Set of 4)', 'Motivational Gift Set including Think and Grow Rich.', 899.00, 50, 4.9, 2100, '{"Books": "4", "Format": "Paperback Set"}'),
(77, 11, 'The Mountain Is You', 'Transforming Self-Sabotage Into Self-Mastery.', 399.00, 120, 4.7, 3400, '{"Author": "Brianna Wiest", "Language": "English"}'),
(78, 11, 'The Great Train Journey', 'A collection of stories about train journeys across India.', 199.00, 200, 4.5, 1200, '{"Author": "Ruskin Bond", "Genre": "Fiction"}'),
(79, 11, 'Don''t Believe Everything You Think', 'Why your thinking is the beginning and end of your suffering.', 299.00, 150, 4.6, 890, '{"Author": "Joseph Nguyen", "Language": "English"}'),
(80, 11, 'Alexander the Great by Jacob Abbott', 'Macedonian Conqueror | Ancient History | Military Genius.', 350.00, 60, 4.4, 150, '{"Author": "Jacob Abbott", "Subject": "History"}'),
(81, 11, 'Penguin Select Classics: The Great Gatsby', 'Original, Unabridged Classic by F. Scott Fitzgerald.', 250.00, 300, 4.6, 12000, '{"Author": "F. Scott Fitzgerald", "Series": "Classics"}'),
(82, 11, 'The Monk Who Sold His Ferrari', 'A spiritual fable about fulfilling your dreams.', 299.00, 400, 4.7, 56000, '{"Author": "Robin Sharma", "Genre": "Self-Help"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(75, 'https://m.media-amazon.com/images/I/81fqWc6aiGL._AC_SL1500_.jpg', TRUE),
(76, 'https://m.media-amazon.com/images/I/71eVoJQz9-L._AC_SL1500_.jpg', TRUE),
(77, 'https://m.media-amazon.com/images/I/61xivWmExiL._AC_SL1500_.jpg', TRUE),
(78, 'https://m.media-amazon.com/images/I/71pPr7c+R8L._AC_SL1500_.jpg', TRUE),
(79, 'https://m.media-amazon.com/images/I/715qi-cIbML._AC_SL1500_.jpg', TRUE),
(80, 'https://m.media-amazon.com/images/I/81dE3URt9BL._AC_SL1500_.jpg', TRUE),
(81, 'https://m.media-amazon.com/images/I/714GHCZrlEL._AC_SL1500_.jpg', TRUE),
(82, 'https://m.media-amazon.com/images/I/61OByUf1TfL._AC_SL1500_.jpg', TRUE);


-- 2. SHOES (Category 36) - Starting from ID 83
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(83, 36, 'Centrino Formal Shoes', 'Classic derby lace-up formal shoes.', 1299.00, 50, 4.2, 450, '{"Material": "Synthetic", "Type": "Formal"}'),
(84, 36, 'BRUTE Sports Shoes', 'High-performance running sports shoes.', 1599.00, 40, 4.3, 320, '{"Type": "Sports", "Brand": "BRUTE"}'),
(85, 36, 'Centrino Casual Loafers', 'Stylish slip-on loafers.', 999.00, 60, 4.1, 560, '{"Type": "Loafer"}'),
(86, 36, 'Boldfit Gym Shoes', 'Lightweight breathable mesh shoes.', 1899.00, 30, 4.5, 120, '{"Brand": "Boldfit", "Use": "Gym"}'),
(87, 36, 'DRACKFOOT Trekking Boots', 'Durable outdoor trekking boots.', 2499.00, 25, 4.4, 230, '{"Type": "Trekking"}'),
(88, 36, 'DRACKFOOT Desert Boots', 'Stylish suede casual boots.', 2199.00, 35, 4.3, 110, '{"Material": "Suede"}'),
(89, 36, 'GENERIC White Sneakers', 'Trendy white sneakers.', 799.00, 100, 4.0, 890, '{"Type": "Sneaker", "Color": "White"}'),
(90, 36, 'Mytaco Fashion Slides', 'Comfortable lightweight slides.', 399.00, 150, 4.2, 45, '{"Type": "Slide"}'),
(91, 36, 'HotStyle Party Shoes', 'Glossy finish party wear shoes.', 1899.00, 20, 4.1, 75, '{"Type": "Party"}'),
(92, 36, 'Generic Jodhpur Shoes', 'Affordable lightweight shoes.', 699.00, 120, 3.9, 1200, '{"Type": "Running"}'),
(93, 36, 'SPARX Men''s Canvas Shoes', 'Durable reliable sports shoes.', 1295.00, 80, 4.4, 3400, '{"Brand": "SPARX"}'),
(94, 36, 'Liberty Smart Casuals', 'High-quality casual shoes.', 1499.00, 45, 4.2, 950, '{"Brand": "Liberty"}'),
(95, 36, 'SPARX Walking Shoes', 'Comfortable walking shoes.', 1199.00, 70, 4.3, 1500, '{"Brand": "SPARX"}'),
(96, 36, 'Centrino Oxford Shoes', 'Premium lace-up business shoes.', 1699.00, 30, 4.5, 210, '{"Type": "Oxford"}'),
(97, 36, 'Bata Comfit Sandals', 'Classic Bata comfort sandals.', 999.00, 100, 4.6, 5600, '{"Brand": "Bata"}');

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


-- 3. FASHION (Category 13) - Starting from ID 98
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(98, 13, 'Symbol Premium Shirt', 'Premium cotton formal shirt.', 1499.00, 100, 4.4, 320, '{"Material": "Cotton"}'),
(100, 13, 'Aatman Ethnic Kurta', 'Traditional festive kurta.', 1899.00, 60, 4.5, 85, '{"Type": "Kurta"}'),
(101, 13, 'Boldfit Sports Tights', 'Compression tights for gym.', 899.00, 150, 4.6, 950, '{"Brand": "Boldfit"}'),
(102, 13, 'KLOSIA Printed Set', 'Printed kurta with pants.', 2199.00, 40, 4.4, 210, '{"Type": "Kurta Set"}'),
(103, 13, 'GoSriKi Cotton Saree', 'Traditional cotton stylish saree.', 1599.00, 35, 4.2, 560, '{"Material": "Cotton"}'),
(104, 13, 'KLOSIA Embroidered Suit', 'Heavy embroidered suit set.', 2899.00, 25, 4.7, 45, '{"Type": "Suit"}'),
(105, 13, 'KOTTY Solid T-Shirt', 'Classic round neck t-shirt.', 499.00, 200, 4.1, 1200, '{"Material": "Cotton"}'),
(106, 13, 'Pashmoda Premium Shawl', 'Exquisite wool blend shawl.', 3500.00, 15, 4.8, 30, '{"Type": "Shawl"}'),
(107, 13, 'GRECIILOOKS Casual Top', 'Trendy georgette casual top.', 799.00, 120, 4.2, 340, '{"Material": "Georgette"}'),
(108, 13, 'Jockey Cotton Vest', 'Super combed cotton comfort.', 299.00, 500, 4.6, 8900, '{"Brand": "Jockey"}'),
(109, 13, 'Van Heusen Trousers', 'Sharp poly-viscose formal trousers.', 1899.00, 70, 4.5, 1200, '{"Brand": "Van Heusen"}'),
(110, 13, 'GoSriKi Straight Kurta', 'Straight-cut daily wear kurta.', 1299.00, 90, 4.3, 740, '{"Type": "Straight"}'),
(111, 13, 'Symbol Lightweight Jacket', 'Stylish jacket for outdoors.', 2499.00, 55, 4.4, 150, '{"Brand": "Symbol"}'),
(112, 13, 'Lymio One Piece Dress', 'Fashionable rayon party dress.', 1599.00, 45, 4.3, 95, '{"Type": "One Piece"}');

-- ID 99 missed? Let's add it. (Step 363 list had 15 items)
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(99, 13, 'UB Unity Brand Hoodie', 'Comfortable soft fleece hoodie.', 1299.00, 80, 4.3, 150, '{"Material": "Fleece"}');

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


-- 4. WATCHES (Category 44) - Starting from ID 113
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(113, 44, 'GOBOULT Smart Watch', '1.69 inch display with health tracking.', 2499.00, 100, 4.5, 320, '{"Type": "Smart"}'),
(114, 44, 'Carlington Elite Watch', 'Analog professional men''s watch.', 1899.00, 50, 4.3, 120, '{"Type": "Analog"}'),
(115, 44, 'Fire-Boltt Phoenix Watch', 'Premium smartwatch with calling feature.', 3299.00, 60, 4.5, 1500, '{"Brand": "Fire-Boltt"}'),
(116, 44, 'Daniel Hechter Paris Analog', 'Elegant Parisian design formal watch.', 3499.00, 30, 4.6, 85, '{"Brand": "Daniel Hechter"}'),
(117, 44, 'Titan Neo Analog Watch', 'Classic blue dial with leather strap.', 5499.00, 40, 4.8, 1200, '{"Brand": "Titan"}'),
(118, 44, 'Casio Enticer Steel', 'Durable stainless steel analog watch.', 2995.00, 75, 4.6, 2100, '{"Brand": "Casio"}'),
(119, 44, 'Titan Karishma Revive', 'Traditional elegance redefined.', 3895.00, 35, 4.5, 560, '{"Brand": "Titan"}'),
(120, 44, 'Fossil Gen 6 Hybrid', 'Analog looks with smartwatch tech.', 18495.00, 15, 4.4, 230, '{"Brand": "Fossil"}'),
(121, 44, 'Titan Raga Viva', 'Inspired by the grace of nature.', 4995.00, 25, 4.7, 890, '{"Brand": "Titan"}'),
(122, 44, 'Matrix Analog Pair', 'Matching pair watches for couples.', 1599.00, 50, 4.2, 145, '{"Brand": "Matrix"}'),
(123, 44, 'Daniel Hechter Classic Leather', 'Timeless brown leather strap watch.', 3199.00, 30, 4.5, 95, '{"Brand": "Daniel Hechter"}'),
(124, 44, 'Casio Vintage Silver', 'Retro digital design in stainless steel.', 1695.00, 60, 4.6, 4500, '{"Brand": "Casio"}'),
(125, 44, 'Titan Workwear Black', 'Sleek black metal professional watch.', 2895.00, 80, 4.4, 340, '{"Brand": "Titan"}'),
(126, 44, 'Noise ColorFit Ultra', 'Large display smartwatch with 60+ modes.', 3299.00, 120, 4.3, 15000, '{"Brand": "Noise"}'),
(127, 44, 'Acnos Premium Analog', 'Affordable luxury analog style.', 699.00, 200, 4.1, 740, '{"Brand": "Acnos"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(113, 'https://m.media-amazon.com/images/I/61Xe3o3IwSL._AC_SL1500_.jpg', TRUE),
(114, 'https://m.media-amazon.com/images/I/61dywKQasaL._AC_SL1500_.jpg', TRUE),
(115, 'https://m.media-amazon.com/images/I/61iOtE+0pwL._AC_SL1500_.jpg', TRUE),
(116, 'https://m.media-amazon.com/images/I/61sICrZSBuL._AC_SL1500_.jpg', TRUE),
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
