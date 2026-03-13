-- 11. HOME DECOR (Category 23: Home & Kitchen)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(158, 23, 'BEHOMA Metal Pair of Swans', 'Handcrafted metal swans with gift box for good luck and love. Elegant candle holder for home decor.', 1299.00, 50, 4.6, 85, '{"Material": "Metal", "Color": "Gold", "Type": "Showpiece Statue"}'),
(159, 23, 'RIZIK STORE Metal Abstract Wall Sculpture', 'Double Moon abstract figures wall sculpture for living room and bedroom decor.', 3499.00, 20, 4.7, 45, '{"Material": "Metal", "Size": "44x27 Inches", "Design": "Double Moon"}'),
(160, 23, 'Ceramic Thinker Couple Family Statue', 'Ceramic thinker sculpture set for home decor. Modern table artifact showpiece.', 1899.00, 35, 4.5, 120, '{"Material": "Ceramic", "Color": "White", "Set": "4 Pcs"}'),
(161, 23, 'G - Creations Romantic Couple Statue', 'Vintage lovers sculpture under tree. Antique resin home decor for anniversary or wedding gifts.', 1499.00, 40, 4.8, 65, '{"Material": "Resin", "Style": "Vintage/Antique", "Theme": "Romantic Couple"}'),
(162, 23, 'Artificial Greenery Ferns Vines', 'Artificial needle wall hanging vines for home, door, wall, or balcony decoration.', 599.00, 100, 4.3, 230, '{"Type": "Artificial Plant", "Usage": "Wall Hanging", "Material": "Plastic"}'),
(163, 23, 'Xtore 3D Butterfly Wall Decor', 'Set of 12 shimmering golden 3D butterfly wall stickers with sticking pads.', 249.00, 200, 4.4, 450, '{"Count": "12 Pcs", "Color": "Shimmer Golden", "Type": "3D Wall Sticker"}'),
(164, 23, 'KridayKraft Metal Ganesha Wall Hanging', 'Lucky Feng Shui Ganesha idol wall decor for home or office. Antique gold finish.', 850.00, 60, 4.7, 180, '{"Material": "Metal", "Size": "20 Cm", "Idol": "Lord Ganesha"}'),
(165, 23, 'Sehaz Artworks Wall Hangings', 'Artistic wall decor items for living room, bedroom, or kitchen.', 799.00, 80, 4.2, 340, '{"Type": "Wall Hanging", "Style": "Modern", "Room": "Multi-Purpose"}'),
(166, 23, 'Sehaz Artworks Photo Frame Collage', 'Photo hanging clips and rope memories wall hanging set. Perfect for friends and family photos.', 499.00, 120, 4.5, 950, '{"Type": "Photo Frame", "Included": "Clips & Rope", "Usage": "Wall Decor"}'),
(167, 23, 'Collectible India Radha Krishna Idol with Diya', 'Peacock design Radha Krishna showpiece with integrated diya for puja and decor.', 699.00, 75, 4.8, 110, '{"Material": "Metal", "Color": "Gold", "Size": "7x5 Inches"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(158, 'https://m.media-amazon.com/images/I/81BIupehFVL._AC_SL1500_.jpg', TRUE),
(159, 'https://m.media-amazon.com/images/I/71hIBmiSxzL._AC_SL1500_.jpg', TRUE),
(160, 'https://m.media-amazon.com/images/I/41VkENkxWkL._AC_SL1500_.jpg', TRUE),
(161, 'https://m.media-amazon.com/images/I/71xMvMeUkfL._AC_SL1500_.jpg', TRUE),
(162, 'https://m.media-amazon.com/images/I/71JJe70jDTL._AC_SL1500_.jpg', TRUE),
(163, 'https://m.media-amazon.com/images/I/71tNwTNO3TL._AC_SL1500_.jpg', TRUE),
(164, 'https://m.media-amazon.com/images/I/71mP1uIKSbL._AC_SL1500_.jpg', TRUE),
(165, 'https://m.media-amazon.com/images/I/71RI4EDTxEL._AC_SL1500_.jpg', TRUE),
(166, 'https://m.media-amazon.com/images/I/71kwV2psAwL._AC_SL1500_.jpg', TRUE),
(167, 'https://m.media-amazon.com/images/I/814wwnDQ1gL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
