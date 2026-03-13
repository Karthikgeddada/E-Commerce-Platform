-- Update Name of Product 43
UPDATE products SET name = 'Sony DualSense Wireless Controller Black (PlayStation 5)' WHERE id = 43;

-- Insert New Controller Products
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(51, 43, 'Sony DualSense Wireless Controller Red (PlayStation 5)', 'Immersive haptic feedback in a striking Cosmic Red design.', 5990.00, 30, 4.7, 450, '{"Battery": "Rechargeable", "Type": "Wireless", "Feedback": "Haptic", "Color": "Red"}'),
(52, 43, 'Sage Controllers PRO+ PS5 Custom Controller', 'Custommade Wireless P.S5 Gaming Controller with 4 Back Paddles, Clicky Triggers & Bumpers. SpiderMn theme.', 12999.00, 10, 4.9, 25, '{"Paddles": "4", "Triggers": "Clicky", "Theme": "Spider-Man", "Tech": "Hall Effect TMR"}'),
(53, 43, 'Nitho NOVA RGB Wired Controller', 'Wired controller with Hall Effect Triggers, RGB lighting, and Programmable Buttons.', 2999.00, 50, 4.2, 180, '{"Type": "Wired", "Lighting": "RGB", "Compatible": "PS5/PS4/PC/Mac", "Triggers": "Hall Effect"}');

-- Update Images for these
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(51, 'https://m.media-amazon.com/images/I/61afp1oz7eL._AC_SL1500_.jpg', TRUE),
(52, 'https://m.media-amazon.com/images/I/51FoGqS7tzL._AC_SL1500_.jpg', TRUE),
(53, 'https://m.media-amazon.com/images/I/71VsJjg5zXL._AC_SL1500_.jpg', TRUE);

-- Update the primary image for 43 just in case
UPDATE product_images SET image_url = 'https://m.media-amazon.com/images/I/61cOKvrU7NL._AC_SL1500_.jpg' WHERE product_id = 43 AND is_primary = TRUE;

-- Reset sequence
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
