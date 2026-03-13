-- 4. SMARTPHONES (Category 17: Electronics)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(60, 17, 'iPhone 17 Pro Max 2 TB', '17.42 cm (6.9″) Display with Promotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center Stage Front Camera; Silver', 199990.00, 20, 4.9, 850, '{"Display": "6.9 inch ProMotion", "Chip": "A19 Pro", "Storage": "2TB", "Color": "Silver"}'),
(61, 17, 'iPhone 16 Plus 128 GB', '5G Mobile Phone with Camera Control, A18 Chip and a Big Boost in Battery Life. Works with AirPods; Black', 89900.00, 45, 4.7, 1200, '{"Display": "6.7 inch", "Chip": "A18", "Storage": "128GB", "Color": "Black"}'),
(62, 17, 'Samsung Galaxy S24 Snapdragon 8 Gen 3', 'Onyx Black, 128 GB, 8 GB RAM. AI features enabled.', 79999.00, 35, 4.8, 2300, '{"Display": "6.2 inch Dynamic AMOLED", "Chip": "Snapdragon 8 Gen 3", "RAM": "8GB", "Storage": "128GB"}'),
(63, 17, 'iQOO Neo 10R 5G', 'Raging Blue, 12GB RAM, 256GB Storage. India''s Slimmest 6400mAh Battery Smartphone.', 34999.00, 50, 4.6, 450, '{"Chip": "Snapdragon 8s Gen 3", "Battery": "6400mAh", "RAM": "12GB", "Storage": "256GB"}'),
(64, 17, 'realme NARZO 80 Lite 5G', 'Crystal Purple, 6GB+128GB. 6000mAh Long-Lasting Battery. AI Assist.', 12999.00, 100, 4.3, 890, '{"Chip": "Dimensity 6300", "Battery": "6000mAh", "RAM": "6GB", "Storage": "128GB"}'),
(65, 17, 'Nothing Phone (3a) Pro 5G', 'Black, 12GB RAM + 256GB Storage. Iconic transparent design.', 39999.00, 40, 4.5, 320, '{"RAM": "12GB", "Storage": "256GB", "Design": "Transparent", "5G": "Yes"}'),
(66, 17, 'Samsung Galaxy M07 Mobile', 'MediaTek Helio G99 | AnTuTu 624K | IP54 | 50MP Camera | 5000mAh Battery.', 11999.00, 75, 4.2, 560, '{"Chip": "Helio G99", "Battery": "5000mAh", "Camera": "50MP", "Thickness": "7.6mm"}'),
(67, 17, 'Samsung Galaxy Z Flip4 5G', 'Bora Purple, 8GB RAM, 256GB Storage. Iconic foldable design.', 84999.00, 15, 4.4, 1800, '{"Display": "6.7 inch Foldable", "RAM": "8GB", "Storage": "256GB", "Foldable": "Yes"}'),
(68, 17, 'realme NARZO 80 Pro 5G', 'Speed Silver, 8GB+256GB. MediaTek Dimensity 7400 Chipset. 6000mAh Titan Battery.', 32999.00, 60, 4.6, 210, '{"Chip": "Dimensity 7400", "Battery": "6000mAh", "Fast Charge": "80W", "Rating": "IP69"}'),
(69, 17, 'OnePlus Nord CE5', 'Massive 7100mAh Battery. Powered by OnePlus AI. 128GB 8GB. Black Infinity.', 24999.00, 80, 4.5, 430, '{"Chip": "Dimensity", "Battery": "7100mAh", "RAM": "8GB", "Storage": "128GB"}'),
(70, 17, 'iPhone 17 256 GB', '15.93 cm (6.3″) Display with Promotion, A19 Chip, Improved Scratch Resistance.', 89900.00, 40, 4.8, 950, '{"Display": "6.3 inch ProMotion", "Chip": "A19", "Storage": "256GB", "Color": "Black"}'),
(71, 17, 'iPhone Air 256 GB', 'Thinnest iPhone Ever, 16.63 cm (6.5″) Display with Promotion up to 120Hz.', 119900.00, 25, 4.9, 120, '{"Display": "6.5 inch ProMotion", "Chip": "A19 Pro", "Feature": "Ultra Thin", "Storage": "256GB"}'),
(72, 17, 'OnePlus 15R 512GB', 'World''s First Snapdragon 8 Gen 5. 7400mAh Battery. 165Hz Display.', 54999.00, 30, 4.9, 85, '{"Chip": "Snapdragon 8 Gen 5", "Battery": "7400mAh", "Display": "165Hz", "Storage": "512GB"}'),
(73, 17, 'Samsung Galaxy M06 5G', 'MediaTek Dimensity 6300 | 12 5G Bands | 25W Fast Charging.', 10999.00, 90, 4.1, 740, '{"Chip": "Dimensity 6300", "5G": "12 Bands", "Battery": "5000mAh", "Camera": "50MP"}'),
(74, 17, 'Motorola Edge 60 Pro', 'Pantone Shadow, 512 GB, 16 GB RAM. Premium workstation performance.', 69999.00, 20, 4.7, 150, '{"RAM": "16GB", "Storage": "512GB", "Design": "Pantone Shadow", "Chip": "Premium"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(60, 'https://m.media-amazon.com/images/I/616-Eh2FbPL._AC_SL1500_.jpg', TRUE),
(61, 'https://m.media-amazon.com/images/I/61evtSm4vDL._AC_SL1500_.jpg', TRUE),
(62, 'https://m.media-amazon.com/images/I/31MK+gOuraL._AC_SL1500_.jpg', TRUE),
(63, 'https://m.media-amazon.com/images/I/61wL8Qbo0HL._AC_SL1500_.jpg', TRUE),
(64, 'https://m.media-amazon.com/images/I/71Vjn1DfArL._AC_SL1500_.jpg', TRUE),
(65, 'https://m.media-amazon.com/images/I/41rP1ZQlF6L._AC_SL1500_.jpg', TRUE),
(66, 'https://m.media-amazon.com/images/I/610lbucItmL._AC_SL1500_.jpg', TRUE),
(67, 'https://m.media-amazon.com/images/I/61vZSG1KuoL._AC_SL1500_.jpg', TRUE),
(68, 'https://m.media-amazon.com/images/I/71J+dpjrzhL._AC_SL1500_.jpg', TRUE),
(69, 'https://m.media-amazon.com/images/I/61IOa9IrlaL._AC_SL1500_.jpg', TRUE),
(70, 'https://m.media-amazon.com/images/I/617O+RkwdPL._AC_SL1500_.jpg', TRUE),
(71, 'https://m.media-amazon.com/images/I/61knPJtYRpL._AC_SL1500_.jpg', TRUE),
(72, 'https://m.media-amazon.com/images/I/61h53LtSVVL._AC_SL1500_.jpg', TRUE),
(73, 'https://m.media-amazon.com/images/I/71evPv-TvmL._AC_SL1500_.jpg', TRUE),
(74, 'https://m.media-amazon.com/images/I/715wPctwmjL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
