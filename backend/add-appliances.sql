-- 13. APPLIANCES (Category 6: Appliances)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(188, 6, 'Wipro Elato CAF 202 Digital Air Fryer', 'PTFE Free Ceramic Coated, 1800W, 7.5 L Capacity with Transparent Full Window.', 8999.00, 30, 4.6, 120, '{"Capacity": "7.5L", "Power": "1800W", "Coating": "Ceramic", "Features": "Transparent Window"}'),
(189, 6, 'SOLARA Air Fryer For Home 4.5L', 'Digital Touch Control with 10 Preset menus and 360° High Speed Air Circulation.', 5499.00, 45, 4.5, 320, '{"Capacity": "4.5L", "Power": "1500W", "Presets": "10", "Tech": "360 Air Circulation"}'),
(190, 6, 'Upliance 1.0 AI Cooking Assistant', 'Cooks 750+ Recipes. AI-Powered with Built-In Weighing Scale and Phone App.', 24999.00, 15, 4.8, 85, '{"Recipes": "750+", "Features": "AI-Powered, WiFi, Phone App", "Scale": "Built-In"}'),
(191, 6, 'PHILIPS Air Fryer NA120/00', 'Rapid Air Technology uses up to 90% less fat. 1500W, 4.2 Liter.', 6999.00, 50, 4.7, 1200, '{"Capacity": "4.2L", "Power": "1500W", "Tech": "Rapid Air", "Brand": "Philips"}'),
(192, 6, 'Prestige PGMFB 800 Watt Grill Sandwich Toaster', 'Fixed Grill Plates for perfectly toasted sandwiches. Compact design.', 1499.00, 100, 4.1, 5600, '{"Power": "800W", "Plates": "Fixed Grill", "Brand": "Prestige"}'),
(193, 6, 'Pigeon 2 Slice Auto Pop up Toaster', 'Smart Bread Toaster for your home with 750 Watts power and auto pop-up.', 1199.00, 80, 4.2, 3400, '{"Power": "750W", "Slices": "2", "Brand": "Pigeon", "Feature": "Auto Pop-up"}'),
(194, 6, 'Cookwell Multipurpose Cook Kettle 1.5L', 'Nonstick Inner Pot, Idli Stand, Steamer, and Egg Tray. 600W power.', 1899.00, 60, 4.3, 740, '{"Capacity": "1.5L", "Power": "600W", "Includes": "Idli Stand, Steamer, Egg Tray"}'),
(195, 6, 'Cookwell Bullet Mixer Grinder (5 Jars)', 'Copper motor, 600 Watts. High-speed grinding for all kitchen needs.', 2499.00, 40, 4.4, 230, '{"Power": "600W", "Jars": "5", "Motor": "Copper", "Brand": "Cookwell"}'),
(196, 6, 'Borosil Chef Delite 300 Watts Electric Chopper', 'Twin Blade Technology with 600 ml clip-n-store plastic bowl.', 1699.00, 75, 4.5, 320, '{"Power": "300W", "Capacity": "600ml", "Tech": "Twin Blade", "Brand": "Borosil"}'),
(197, 6, 'Portable Blender Electric Juicer (6 Blades)', 'USB Rechargeable Smoothie Mini Personal Juicer with 1500 mAh battery.', 799.00, 120, 4.0, 890, '{"Blades": "6", "Battery": "1500mAh", "Rechargeable": "USB", "Type": "Portable"}'),
(198, 6, 'SOLARA 12L Air Fryer Oven', '1800W OTG with 12 Presets and 9 Accessories including Grill, Roast, and Bake.', 10999.00, 20, 4.7, 150, '{"Capacity": "12L", "Power": "1800W", "Presets": "12", "Type": "Air Fryer OTG"}'),
(199, 6, 'Goodscity Blender For Smoothie And Juices', 'USB Rechargeable Fruit Juice Maker with 450ml BPA FREE Glass Jar.', 1299.00, 55, 4.3, 340, '{"Capacity": "450ml", "Jar": "Borosilicate Glass", "BPA-Free": "Yes"}'),
(200, 6, 'Morphy Richards Europa Drip Coffee Machine', '6-Cups Capacity, Anti-Drip Function, and Warming Plate. 600W.', 2899.00, 30, 4.5, 95, '{"Capacity": "6 Cups", "Power": "600W", "Brand": "Morphy Richards", "Function": "Anti-Drip"}'),
(201, 6, 'Wipro Elato BE201 4in1 Multicooker', 'Boils up to 16 Eggs, Steam Rice, and Poach Eggs. 500 Watt.', 1599.00, 45, 4.4, 150, '{"Power": "500W", "Functions": "4in1", "Brand": "Wipro", "Egg Capacity": "16"}'),
(202, 6, 'Portronics Tornado Mini Handheld Air Duster', 'Rechargeable Type-C, Up to 130000 RPM for cleaning laptops and cars.', 2299.00, 60, 4.6, 45, '{"Speed": "130000 RPM", "Charging": "Type-C", "Use": "Computers, Cars"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(188, 'https://m.media-amazon.com/images/I/61+Llh3SkAL._AC_SL1500_.jpg', TRUE),
(189, 'https://m.media-amazon.com/images/I/71n8j6IOD5L._AC_SL1500_.jpg', TRUE),
(190, 'https://m.media-amazon.com/images/I/51GB+UkLuoL._AC_SL1500_.jpg', TRUE),
(191, 'https://m.media-amazon.com/images/I/41Z5ldkAeYL._AC_SL1500_.jpg', TRUE),
(192, 'https://m.media-amazon.com/images/I/51ZtiPd0PVL._AC_SL1500_.jpg', TRUE),
(193, 'https://m.media-amazon.com/images/I/51x15vgzI2L._AC_SL1500_.jpg', TRUE),
(194, 'https://m.media-amazon.com/images/I/71vHpGnWEdL._AC_SL1500_.jpg', TRUE),
(195, 'https://m.media-amazon.com/images/I/81yobRRV8nL._AC_SL1500_.jpg', TRUE),
(196, 'https://m.media-amazon.com/images/I/51HKajX7fJL._AC_SL1500_.jpg', TRUE),
(197, 'https://m.media-amazon.com/images/I/41Sb3p-NPBL._AC_SL1500_.jpg', TRUE),
(198, 'https://m.media-amazon.com/images/I/81nj934mZvL._AC_SL1500_.jpg', TRUE),
(199, 'https://m.media-amazon.com/images/I/61UDw8JkclL._AC_SL1500_.jpg', TRUE),
(200, 'https://m.media-amazon.com/images/I/61iKvcMlvgL._AC_SL1500_.jpg', TRUE),
(201, 'https://m.media-amazon.com/images/I/71txrW9P3eL._AC_SL1500_.jpg', TRUE),
(202, 'https://m.media-amazon.com/images/I/61+N9FyfSzL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
