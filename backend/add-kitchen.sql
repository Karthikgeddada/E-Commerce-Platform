-- 9. KITCHEN (Category 23: Home & Kitchen)

-- Update Existing Kitchen Product (23)
UPDATE products SET 
    name = 'Pigeon Non-Stick Tawa', 
    description = 'Durable non-stick cooking base for crispy dosas and rotis.', 
    price = 850.00 
WHERE id = 23;
-- Keeping Pigeon image for now or update if user provided better one.

-- Insert New Kitchen Products (Starting from 128)
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(128, 23, 'Cüraa ChopLab Lite Manual Chopper', '650 ml Portable Vegetable Chopper with Stainless Steel Blades.', 499.00, 100, 4.5, 320, '{"Capacity": "650ml", "Color": "Red", "Blades": "Stainless Steel"}'),
(129, 23, 'Ace Blend Cloudstick Coffee Frother', 'Battery Operated Portable Foam Maker. Stainless Steel Electric Whisk.', 349.00, 150, 4.4, 210, '{"Type": "Electric", "Material": "Stainless Steel", "Use": "Lattes, Frappe"}'),
(130, 23, 'Premium Sleek Stainless Steel Chopping Board', 'Large 41cm x 29cm – Rust Free Cutting Board Steel, Easy to Clean.', 899.00, 50, 4.6, 120, '{"Size": "41x29 cm", "Material": "Stainless Steel", "Rust-Free": "Yes"}'),
(131, 23, '304 Stainless Steel Chopping Board with Lip', 'Medium 42 x 32 cm. Food Grade Steel. Includes 2 Steel Straws.', 1199.00, 40, 4.5, 85, '{"Size": "42x32 cm", "Material": "304 Stainless Steel", "Grade": "Food Grade"}'),
(132, 23, 'Happi Planet Kitchen Cleaner', 'India’s 1st Foaming Formulation for Less Scrubbing. Non Toxic & Natural.', 299.00, 200, 4.3, 540, '{"Volume": "500ml", "Form": "Foaming", "Type": "Natural"}'),
(133, 23, 'Beco Reusable Kitchen Towel Roll', '2000 Times Washable. Soft & Highly Absorbent. Eco Bamboo Wipes.', 349.00, 80, 4.5, 320, '{"Sheets": "20", "Material": "Bamboo", "Washable": "2000 times"}'),
(134, 23, 'ATOM ALISTON K1 Digital Kitchen Scale', 'Electronic Weight Machine with LCD Display for Baking & Cooking (10 kg).', 499.00, 60, 4.4, 540, '{"Capacity": "10kg", "Display": "LCD", "Warranty": "6 Months"}'),
(135, 23, 'The Great Indian Kitchen Utensil Set', 'Traditional Indian kitchen tool collection.', 1499.00, 30, 4.7, 45, '{"Type": "Utensil Set", "Material": "Copper/Steel"}'),
(136, 23, 'Plastic 3 in 1 Soap Pump Dispenser', 'Dish Soap Liquid Dispenser with Sponge Holder for Sink Countertop.', 249.00, 100, 4.2, 560, '{"Material": "Plastic", "Capacity": "350ml", "Included": "Sponge"}'),
(137, 23, 'PANCA Dish Drying Kitchen Mat', 'Large Water Absorbent Utensil Drying Rack Mat (40x60 cm).', 399.00, 120, 4.6, 950, '{"Size": "40x60 cm", "Absorbent": "Yes", "Anti-Slip": "Yes"}'),
(138, 23, 'Clazkit Food Strainer Colander', 'Fruit Basket & Pasta Strainer Washing Bowl. Unbreakable.', 299.00, 90, 4.3, 740, '{"Material": "Plastic", "Size": "24x18 cm", "Use": "Washing"}'),
(139, 23, 'Gala Sponge Wipe (5 Pcs Pack)', 'Multipurpose durable sponge wipes for kitchen cleaning.', 199.00, 500, 4.6, 890, '{"Count": "5 Pcs", "Type": "Sponge Wipe", "Brand": "Gala"}'),
(140, 23, 'Silver Stainless Steel Tabletop Cup Rack', 'Elegant Dining Table Cup Holder for 12 Cups.', 699.00, 45, 4.4, 150, '{"Material": "Stainless Steel", "Capacity": "12 Cups"}'),
(141, 23, 'Seznik Sealing Machine for Food Packets', 'Portable Handheld Sealing for Snacks & Chips. Fresh Storage.', 249.00, 150, 4.3, 95, '{"Type": "Handheld", "Warranty": "1 Year", "Color": "White"}'),
(142, 23, 'CELLO Checkers Kitchen Storage Set (18 Pcs)', 'Transparent Unbreakable Airtight Canister Set For Grains & Spices.', 1299.00, 35, 4.6, 120, '{"Pieces": "18", "Material": "Plastic", "Airtight": "Yes"}'),
(143, 23, 'E-COSMOS Food Chopper 900ml', '4 Blade Steel Large Manual Hand-Press Vegetable Chopper.', 595.00, 75, 4.5, 430, '{"Capacity": "900ml", "Blades": "4 Steel", "Type": "Manual"}'),
(144, 23, 'MARKWELL Plastic 3 in 1 Dish Soap Pump', 'Soap Liquid Pump Dispenser with Sponge Holder.', 249.00, 100, 4.1, 740, '{"Material": "Plastic", "Type": "Dispenser"}'),
(145, 23, 'Transparent Glass Jar mataki (6 pcs)', '400 ml Mataki Glass Jar with Airtight Metal Lid.', 899.00, 50, 4.5, 320, '{"Count": "6", "Capacity": "400ml", "Material": "Glass"}'),
(146, 23, 'Kitchen Towel Microfiber (4 pcs)', 'Anti Bacterial Hand Towel. Lint Free Kitchen Napkins.', 399.00, 120, 4.4, 150, '{"Count": "4", "Material": "Microfiber", "Anti-Bacterial": "Yes"}'),
(147, 23, 'Scotch-Brite Small wiper', 'Superior TPE Blade for Kitchen, Bathroom & car windows.', 199.00, 200, 4.6, 1200, '{"Brand": "Scotch-Brite", "Blade": "TPE", "Use": "Multi-Surface"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(128, 'https://m.media-amazon.com/images/I/71qELmK1QPL._AC_SL1500_.jpg', TRUE),
(129, 'https://m.media-amazon.com/images/I/51jGr+6XUhL._AC_SL1500_.jpg', TRUE),
(130, 'https://m.media-amazon.com/images/I/81AmydPVv3L._AC_SL1500_.jpg', TRUE),
(131, 'https://m.media-amazon.com/images/I/71egnHxY1OL._AC_SL1500_.jpg', TRUE),
(132, 'https://m.media-amazon.com/images/I/7110A3z6NBL._AC_SL1500_.jpg', TRUE),
(133, 'https://m.media-amazon.com/images/I/614AH2GZ6zL._AC_SL1500_.jpg', TRUE),
(134, 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SL1500_.jpg', TRUE),
(135, 'https://m.media-amazon.com/images/I/71lk8A0dyHL._AC_SL1500_.jpg', TRUE),
(136, 'https://m.media-amazon.com/images/I/618xrswsstL._AC_SL1500_.jpg', TRUE),
(137, 'https://m.media-amazon.com/images/I/718mBgi6nJL._AC_SL1500_.jpg', TRUE),
(138, 'https://m.media-amazon.com/images/I/41Oinc187fL._AC_SL1500_.jpg', TRUE),
(139, 'https://m.media-amazon.com/images/I/81ZaEOi43nL._AC_SL1500_.jpg', TRUE),
(140, 'https://m.media-amazon.com/images/I/517MS2MWlRL._AC_SL1500_.jpg', TRUE),
(141, 'https://m.media-amazon.com/images/I/61Ug9kTwzoL._AC_SL1500_.jpg', TRUE),
(142, 'https://m.media-amazon.com/images/I/71PjqF8xEFL._AC_SL1500_.jpg', TRUE),
(143, 'https://m.media-amazon.com/images/I/819NRTyFvoL._AC_SL1500_.jpg', TRUE),
(144, 'https://m.media-amazon.com/images/I/51geMcR5teL._AC_SL1500_.jpg', TRUE),
(145, 'https://m.media-amazon.com/images/I/81nFPC8GvbL._AC_SL1500_.jpg', TRUE),
(146, 'https://m.media-amazon.com/images/I/71IaTXwVKdL._AC_SL1500_.jpg', TRUE),
(147, 'https://m.media-amazon.com/images/I/61aGaJ-+gaL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
