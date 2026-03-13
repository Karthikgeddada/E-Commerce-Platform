-- 12. WOMEN'S FASHION & LIFESTYLE (Category 13: Clothing & Accessories)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(168, 13, 'Enamor Women''s Cotton Lounge Pants', 'Ultra-soft cotton lounge pants for maximum comfort and style.', 1299.00, 80, 4.4, 320, '{"Material": "Cotton", "Brand": "Enamor", "Fit": "Relaxed"}'),
(169, 13, 'Enamor Athleisure Yoga Leggings', 'Premium performance leggings for yoga and gym workouts.', 1899.00, 60, 4.6, 210, '{"Material": "Polyester Blend", "Brand": "Enamor", "Type": "Leggings"}'),
(170, 13, 'Boldfit Sports Bra for Gym', 'High impact sports bra with breathable mesh panels.', 799.00, 150, 4.5, 950, '{"Brand": "Boldfit", "Type": "Sports Bra", "Impact": "High"}'),
(171, 13, 'Leriya Fashion Western Dress', 'Trendy floral print western dress for parties and casual outings.', 1599.00, 45, 4.2, 560, '{"Brand": "Leriya Fashion", "Type": "Western Dress", "Print": "Floral"}'),
(172, 13, 'Leriya Fashion Oversized Shirt', 'Stylish oversized cotton shirt for a modern casual look.', 999.00, 100, 4.3, 1200, '{"Brand": "Leriya Fashion", "Material": "Cotton", "Fit": "Oversized"}'),
(173, 13, 'Lymio Women''s Regular Top', 'Elegant regular fit top with stylish sleeve details.', 699.00, 120, 4.1, 740, '{"Brand": "Lymio", "Type": "Top", "Fit": "Regular"}'),
(174, 13, 'KLOSIA Kurta with Palazzo Set', 'Traditional printed kurta set with matching palazzos.', 2199.00, 40, 4.5, 320, '{"Brand": "KLOSIA", "Type": "Kurta Set", "Occasion": "Festive"}'),
(175, 13, 'AUSK Women''s Cotton T-Shirt', 'Premium plain cotton t-shirt for everyday comfort.', 499.00, 200, 4.4, 450, '{"Brand": "AUSK", "Material": "100% Cotton", "Neck": "Round"}'),
(176, 13, 'Lymio Stylish One Piece Dress', 'Fashionable knee-length one piece dress for parties.', 1599.00, 50, 4.3, 150, '{"Brand": "Lymio", "Type": "One Piece", "Length": "Knee"}'),
(177, 13, 'Leriya Fashion Rayon Kurta Set', 'Comfortable orinted rayon kurta set for daily wear.', 1299.00, 90, 4.2, 850, '{"Brand": "Leriya Fashion", "Material": "Rayon", "Type": "Kurta Set"}'),
(178, 13, 'GRECIILOOKS Fashion Top', 'Trendy designer top with elegant neckline.', 899.00, 110, 4.2, 340, '{"Brand": "GRECIILOOKS", "Type": "Top", "Material": "Crepe"}'),
(179, 13, 'Mack Jonney Women''s Jacket', 'Casual lightweight jacket for outdoors and mild winter.', 2499.00, 30, 4.4, 95, '{"Brand": "Mack Jonney", "Type": "Jacket", "Closure": "Zipper"}'),
(180, 13, 'GRECIILOOKS Western Co-ord Set', 'Modern co-ord set for a coordinated stylish look.', 1899.00, 45, 4.5, 120, '{"Brand": "GRECIILOOKS", "Type": "Co-ord Set", "Style": "Modern"}'),
(181, 13, 'Leriya Fashion Corduroy Shirt', 'Premium corduroy shirt with a soft texture and classic look.', 1499.00, 55, 4.4, 210, '{"Brand": "Leriya Fashion", "Material": "Corduroy", "Type": "Shirt"}'),
(182, 13, 'Shining Diva Fashion Jewellery Set', 'Exquisite designer jewellery set for weddings and parties.', 699.00, 150, 4.7, 4500, '{"Brand": "Shining Diva", "Type": "Jewellery Set", "Plating": "Gold"}'),
(183, 13, 'Lymio Midi Summer Dress', 'Breathable and stylish midi dress perfect for summer.', 1599.00, 40, 4.3, 75, '{"Brand": "Lymio", "Type": "Midi Dress", "Season": "Summer"}'),
(184, 13, 'Solitude Women''s Trousers', 'Professional formal trousers with a sharp tailored fit.', 1899.00, 65, 4.5, 150, '{"Brand": "Solitude", "Type": "Trousers", "Fit": "Formal"}'),
(185, 13, 'Leriya Fashion Satin Shirt', 'Elegant solid satin shirt with a luxurious silky feel.', 1199.00, 70, 4.4, 320, '{"Brand": "Leriya Fashion", "Material": "Satin", "Type": "Shirt"}'),
(186, 13, 'Lymio Printed Peplum Top', 'Trendy peplum top with vibrant floral prints.', 799.00, 100, 4.2, 180, '{"Brand": "Lymio", "Type": "Peplum Top", "Print": "Floral"}'),
(187, 13, 'Leriya Fashion Velvet Suit Set', 'Luxury velvet suit set with intricate embroidery.', 3500.00, 20, 4.8, 45, '{"Brand": "Leriya Fashion", "Material": "Velvet", "Work": "Embroidery"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(168, 'https://m.media-amazon.com/images/I/71tn9jhC6lL._AC_SL1500_.jpg', TRUE),
(169, 'https://m.media-amazon.com/images/I/511ynafXlNL._AC_SL1500_.jpg', TRUE),
(170, 'https://m.media-amazon.com/images/I/61H8O-CnD-L._AC_SL1500_.jpg', TRUE),
(171, 'https://m.media-amazon.com/images/I/7109Zsj25JL._AC_SL1500_.jpg', TRUE),
(172, 'https://m.media-amazon.com/images/I/61EoolEoCBL._AC_SL1500_.jpg', TRUE),
(173, 'https://m.media-amazon.com/images/I/61N03oj9kyL._AC_SL1500_.jpg', TRUE),
(174, 'https://m.media-amazon.com/images/I/71I53evweVL._AC_SL1500_.jpg', TRUE),
(175, 'https://m.media-amazon.com/images/I/51MZ55vbGaL._AC_SL1500_.jpg', TRUE),
(176, 'https://m.media-amazon.com/images/I/71qJNrZhd1L._AC_SL1500_.jpg', TRUE),
(177, 'https://m.media-amazon.com/images/I/61QW9z6aw3L._AC_SL1500_.jpg', TRUE),
(178, 'https://m.media-amazon.com/images/I/51efXl8NOnL._AC_SL1500_.jpg', TRUE),
(179, 'https://m.media-amazon.com/images/I/514hUpcfUKL._AC_SL1500_.jpg', TRUE),
(180, 'https://m.media-amazon.com/images/I/61PnZAQSfWL._AC_SL1500_.jpg', TRUE),
(181, 'https://m.media-amazon.com/images/I/71woijRAruL._AC_SL1500_.jpg', TRUE),
(182, 'https://m.media-amazon.com/images/I/71UCk9VMVrL._AC_SL1500_.jpg', TRUE),
(183, 'https://m.media-amazon.com/images/I/61Q+oTHo0EL._AC_SL1500_.jpg', TRUE),
(184, 'https://m.media-amazon.com/images/I/61kuDf-pmNL._AC_SL1500_.jpg', TRUE),
(185, 'https://m.media-amazon.com/images/I/615W1abrC2L._AC_SL1500_.jpg', TRUE),
(186, 'https://m.media-amazon.com/images/I/611LL+2WZJL._AC_SL1500_.jpg', TRUE),
(187, 'https://m.media-amazon.com/images/I/51a4j0YLDjL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
