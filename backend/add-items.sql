-- 1. CONTROLLERS (Category 43: Video Games)

-- Update Existing Controller (43)
UPDATE products SET name = 'Sony DualSense Wireless Controller Black (PlayStation 5)' WHERE id = 43;
UPDATE product_images SET image_url = 'https://m.media-amazon.com/images/I/61cOKvrU7NL._AC_SL1500_.jpg' WHERE product_id = 43 AND is_primary = TRUE;

-- Insert New Controllers
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(51, 43, 'Sony DualSense Wireless Controller Red (PlayStation 5)', 'Immersive haptic feedback in a striking Cosmic Red design.', 5990.00, 30, 4.7, 450, '{"Battery": "Rechargeable", "Type": "Wireless", "Feedback": "Haptic", "Color": "Red"}'),
(52, 43, 'Sage Controllers PRO+ PS5 Custom Controller', 'Custommade Wireless P.S5 Gaming Controller with 4 Back Paddles, Clicky Triggers & Bumpers. SpiderMn theme.', 12999.00, 10, 4.9, 25, '{"Paddles": "4", "Triggers": "Clicky", "Theme": "Spider-Man", "Tech": "Hall Effect TMR"}'),
(53, 43, 'Nitho NOVA RGB Wired Controller', 'Wired controller with Hall Effect Triggers, RGB lighting, and Programmable Buttons.', 2999.00, 50, 4.2, 180, '{"Type": "Wired", "Lighting": "RGB", "Compatible": "PS5/PS4/PC/Mac", "Triggers": "Hall Effect"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(51, 'https://m.media-amazon.com/images/I/61afp1oz7eL._AC_SL1500_.jpg', TRUE),
(52, 'https://m.media-amazon.com/images/I/51FoGqS7tzL._AC_SL1500_.jpg', TRUE),
(53, 'https://m.media-amazon.com/images/I/71VsJjg5zXL._AC_SL1500_.jpg', TRUE);


-- 2. YOGA MATS (Category 38: Sports, Fitness & Outdoors)

-- Update Existing Yoga Mat (38) to a specific brand if needed, or just keep it. 
-- Let's update it to the TEGO one to improve quality.
UPDATE products SET name = 'TEGO Core Yoga Mat (Teal Gold)', description = '8mm Ultra-Cushioned TPE Mat with Posture Reference Lines. Antimicrobial, Non-Slip, Lightweight & Portable with Carry Bag.', price = 2499.00, specifications = '{"Thickness": "8mm", "Material": "TPE", "Features": "Posture Lines, Antimicrobial", "Size": "72x26 in"}' WHERE id = 38;
UPDATE product_images SET image_url = 'https://m.media-amazon.com/images/I/51hXMytwlRL._AC_SL1500_.jpg' WHERE product_id = 38 AND is_primary = TRUE;

-- Insert New Yoga Mats
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(54, 38, 'WiseLife TRUE Body Alignment Yoga Mat', 'Non-Slip Textured Extra Wide & Thick Pro Balance TPE Exercise Mat with Yoga Strap.', 1899.00, 40, 4.6, 320, '{"Thickness": "6mm", "Material": "TPE", "Included": "Yoga Strap", "Features": "Body Alignment"}'),
(55, 38, 'WiseLife Classic ECO TPE 10 MM Yoga Mat', 'Extra Thick, Long & Wide Non-Slip, Anti-Tear Exercise Mat for Home & Gym.', 2199.00, 35, 4.5, 210, '{"Thickness": "10mm", "Material": "ECO TPE", "Features": "Extra Thick, Anti-Tear"}'),
(56, 38, 'Hykes Yoga Mat for Women & Men', 'TPE Eco Friendly 6mm thickness Non Slip Classic Pro Exercise Mat with carry Bag & strap.', 1499.00, 60, 4.4, 540, '{"Thickness": "6mm", "Material": "TPE", "Included": "Carry Bag & Strap"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(54, 'https://m.media-amazon.com/images/I/610pL4mjxFL._AC_SL1500_.jpg', TRUE),
(55, 'https://m.media-amazon.com/images/I/61W2WuYiSnL._AC_SL1500_.jpg', TRUE),
(56, 'https://m.media-amazon.com/images/I/515DH+-hjxL._AC_SL1500_.jpg', TRUE);


-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
