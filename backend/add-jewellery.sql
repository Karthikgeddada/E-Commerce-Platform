-- 14. JEWELLERY & ACCESSORIES (Category 25: Jewellery)

INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(203, 25, 'Amazon Brand - Symbol Men''s Multi-Strand Bracelet', 'Rugged and stylish multi-strand bracelet for a modern look.', 599.00, 100, 4.2, 120, '{"Material": "Leather & Steel", "Brand": "Symbol", "Style": "Multi-Strand"}'),
(204, 25, 'Clara 925 Sterling Silver Pendant with Chain', 'Elegant sterling silver pendant, perfect for daily wear or special occasions.', 1499.00, 50, 4.6, 230, '{"Material": "925 Sterling Silver", "Brand": "Clara", "Included": "Chain"}'),
(205, 25, 'GIVA 925 Sterling Silver Classic Solitaire Ring', 'A timeless classic solitaire ring crafted in pure sterling silver.', 1899.00, 40, 4.8, 1500, '{"Material": "Sterling Silver", "Stone": "Zircon", "Brand": "GIVA"}'),
(206, 25, 'Clara Rhodium Plated Silver Earrings', 'Beautiful rhodium-plated silver earrings with a brilliant shine.', 999.00, 75, 4.4, 85, '{"Plating": "Rhodium", "Material": "Silver", "Brand": "Clara"}'),
(207, 25, 'Shining Diva Fashion 18k Gold Plated Jewellery Set', 'Traditional 18k gold plated necklace set for weddings and festivals.', 1299.00, 60, 4.3, 340, '{"Plating": "18k Gold", "Type": "Necklace Set", "Brand": "Shining Diva"}'),
(208, 25, 'Amazon Brand - Symbol Brown Men''s Wallet', 'Slim and sophisticated leather wallet with multiple card slots.', 799.00, 120, 4.5, 560, '{"Material": "Genuine Leather", "Brand": "Symbol", "Type": "Bi-fold"}'),
(209, 25, 'Shining Diva Fashion Multilayer Crystal Bracelet', 'Trendy multilayer bracelet with sparkling crystal accents.', 499.00, 150, 4.2, 1100, '{"Type": "Bracelet", "Material": "Crystal", "Brand": "Shining Diva"}'),
(210, 25, 'Shining Diva Fashion Pearl Necklace Set', 'Classic pearl necklace with matching earrings for an elegant look.', 899.00, 80, 4.6, 210, '{"Type": "Necklace Set", "Material": "Pearl", "Brand": "Shining Diva"}'),
(211, 25, 'Shining Diva Fashion Oxidised Silver Earrings', 'Bohemian style oxidised silver earrings for a trendy ethnic look.', 399.00, 200, 4.4, 890, '{"Type": "Earrings", "Material": "Oxidised Metal", "Style": "Ethnic"}'),
(212, 25, 'Amazon Brand - Symbol Aviator Sunglasses', 'Classic aviator sunglasses with UV protection and metal frame.', 999.00, 90, 4.3, 430, '{"Type": "Sunglasses", "Style": "Aviator", "Protection": "UV400"}'),
(213, 25, 'Shining Diva Fashion Floral Pendant Necklace', 'Delicate floral design pendant on a fine gold-tone chain.', 595.00, 110, 4.5, 75, '{"Type": "Pendant", "Design": "Floral", "Plating": "Gold-tone"}'),
(214, 25, 'Amazon Brand - Symbol Black Leather Belt', 'Durable black leather belt with a sleek metallic buckle.', 699.00, 130, 4.4, 1200, '{"Material": "Leather", "Brand": "Symbol", "Color": "Black"}'),
(215, 25, 'Shining Diva Fashion Ethnic Jhumka Earrings', 'Traditional Jhumka earrings with intricate craftsmanship and beads.', 449.00, 180, 4.5, 560, '{"Type": "Jhumka", "Style": "Ethnic", "Brand": "Shining Diva"}'),
(216, 25, 'Shining Diva Fashion Statement Choker', 'Bold statement choker necklace to elevate any party outfit.', 1199.00, 45, 4.7, 95, '{"Type": "Choker", "Occasion": "Party", "Brand": "Shining Diva"}'),
(217, 25, 'Shining Diva Fashion Adjustable Crystal Ring', 'Elegant adjustable ring with a large center crystal.', 299.00, 250, 4.1, 740, '{"Type": "Ring", "Material": "Crystal", "Adjustable": "Yes"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(203, 'https://m.media-amazon.com/images/I/81ke3TW944L._AC_SL1500_.jpg', TRUE),
(204, 'https://m.media-amazon.com/images/I/41Eqfk8gwKL._AC_SL1500_.jpg', TRUE),
(205, 'https://m.media-amazon.com/images/I/61t+uVixKlL._AC_SL1500_.jpg', TRUE),
(206, 'https://m.media-amazon.com/images/I/41SUvPKCYDL._AC_SL1500_.jpg', TRUE),
(207, 'https://m.media-amazon.com/images/I/713ZDAwhQuL._AC_SL1500_.jpg', TRUE),
(208, 'https://m.media-amazon.com/images/I/713n+TxyfCL._AC_SL1500_.jpg', TRUE),
(209, 'https://m.media-amazon.com/images/I/71R2QnSdv+L._AC_SL1500_.jpg', TRUE),
(210, 'https://m.media-amazon.com/images/I/71UCk9VMVrL._AC_SL1500_.jpg', TRUE),
(211, 'https://m.media-amazon.com/images/I/51JBNLtPvQS._AC_SL1500_.jpg', TRUE),
(212, 'https://m.media-amazon.com/images/I/81ufCEY5ZNL._AC_SL1500_.jpg', TRUE),
(213, 'https://m.media-amazon.com/images/I/71CuPe9AmEL._AC_SL1500_.jpg', TRUE),
(214, 'https://m.media-amazon.com/images/I/71ZOaLOUQtL._AC_SL1500_.jpg', TRUE),
(215, 'https://m.media-amazon.com/images/I/61Emq89LIUL._AC_SL1500_.jpg', TRUE),
(216, 'https://m.media-amazon.com/images/I/61v2wmAXkqL._AC_SL1500_.jpg', TRUE),
(217, 'https://m.media-amazon.com/images/I/71K8ct4g6gL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
