-- 3. STICKY NOTES (Category 33: Office Products)

-- Update Existing Sticky Notes (33)
UPDATE products SET 
    name = 'Set of 10 Katty Mao Sticky Notes Set', 
    description = '3 Bright Pastel Colors, 3x3 Inch, 50 Sheets Per Pad. Strong Adhesive, Perfect for Study, School, Arts and Crafts.', 
    price = 399.00, 
    specifications = '{"Pack": "10 Pads", "Sheets": "50 per pad", "Size": "3x3 inch", "Colors": "3 Bright Pastel"}' 
WHERE id = 33;

UPDATE product_images SET image_url = 'https://m.media-amazon.com/images/I/51sQjYW4UgL._AC_SL1500_.jpg' WHERE product_id = 33 AND is_primary = TRUE;

-- Insert New Sticky Notes
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(57, 33, 'Peeplvalue 400 Sticky Notes (5 Colors)', 'Fluorescent Paper Self Adhesive and Removable Sticky Notes, Page Marker Bookmarks Sticks Securely.', 249.00, 100, 4.4, 120, '{"Pack": "400 Sheets", "Colors": "5 Mix", "Size": "3x3 inch", "Type": "Fluorescent"}'),
(58, 33, 'Peeplvalue 960 Sticky Notes (3 Colors)', 'Long 1x3 inch Page Marker Bookmarks. Self Adhesive and Removable.', 349.00, 80, 4.3, 85, '{"Pack": "960 Sheets", "Colors": "3 Mix", "Size": "1x3 inch", "Type": "Page Marker"}'),
(59, 33, 'Peeplvalue Multicolor 2000 Sticky Notes', 'Multicolor 5 Different Shapes (20 pads x 100 sheets). Removable and decorative shapes.', 699.00, 50, 4.5, 45, '{"Pack": "2000 Sheets", "Pads": "20", "Shapes": "5 Different", "Colors": "5"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(57, 'https://m.media-amazon.com/images/I/61gMu+D9syL._AC_SL1500_.jpg', TRUE),
(58, 'https://m.media-amazon.com/images/I/31CtdD3LW4L._AC_SL1500_.jpg', TRUE),
(59, 'https://m.media-amazon.com/images/I/71wKCsmYiBL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
