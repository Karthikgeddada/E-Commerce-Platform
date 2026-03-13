-- 5. BOOKS (Category 11: Books)

-- Update Existing Book (11)
UPDATE products SET 
    name = 'The Psychology of Money', 
    description = 'Timeless lessons on wealth, greed, and happiness.', 
    price = 350.00, 
    specifications = '{"Author": "Morgan Housel", "Format": "Paperback", "Pages": "252"}' 
WHERE id = 11;

UPDATE product_images SET image_url = 'https://m.media-amazon.com/images/I/71XEsXS5RlL._AC_SL1500_.jpg' WHERE product_id = 11 AND is_primary = TRUE;

-- Insert New Books
INSERT INTO products (id, category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES
(75, 11, 'Human Edge in the AI Age', 'Eight Timeless Mantras for Success | By the Bestselling Author of Winning in the Digital Age.', 499.00, 100, 4.8, 150, '{"Author": "Various", "Topic": "AI & Success", "Format": "Paperback"}'),
(76, 11, 'World''s Greatest Books For Personal Growth & Wealth (Set of 4)', 'Set includes: How to Win Friends, Think and Grow Rich, The Richest Man in Babylon, The Power of Your Subconscious Mind.', 899.00, 50, 4.9, 2100, '{"Books": "4", "Format": "Paperback Set", "Type": "Motivational"}'),
(77, 11, 'The Mountain Is You', 'Transforming Self-Sabotage Into Self-Mastery. A guide to overcoming internal obstacles.', 399.00, 120, 4.7, 3400, '{"Author": "Brianna Wiest", "Format": "Paperback", "Language": "English"}'),
(78, 11, 'The Great Train Journey', 'A collection of stories about train journeys across India.', 199.00, 200, 4.5, 1200, '{"Author": "Ruskin Bond", "Format": "Paperback", "Genre": "Fiction"}'),
(79, 11, 'Don''t Believe Everything You Think', 'Why your thinking is the beginning and end of your suffering.', 299.00, 150, 4.6, 890, '{"Author": "Joseph Nguyen", "Format": "Paperback", "Language": "English"}'),
(80, 11, 'Alexander the Great by Jacob Abbott', 'Macedonian Conqueror | Ancient History | Military Genius | Classic Biography.', 350.00, 60, 4.4, 150, '{"Author": "Jacob Abbott", "Format": "Paperback", "Subject": "History"}'),
(81, 11, 'Penguin Select Classics: The Great Gatsby', 'Original, Unabridged Classic by F. Scott Fitzgerald.', 250.00, 300, 4.6, 12000, '{"Author": "F. Scott Fitzgerald", "Format": "Paperback", "Series": "Penguin Select"}'),
(82, 11, 'The Monk Who Sold His Ferrari', 'A spiritual fable about fulfilling your dreams and reaching your destiny.', 299.00, 400, 4.7, 56000, '{"Author": "Robin Sharma", "Format": "Paperback", "Genre": "Self-Help"}');

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(75, 'https://m.media-amazon.com/images/I/81fqWc6aiGL._AC_SL1500_.jpg', TRUE),
(76, 'https://m.media-amazon.com/images/I/71eVoJQz9-L._AC_SL1500_.jpg', TRUE),
(77, 'https://m.media-amazon.com/images/I/61xivWmExiL._AC_SL1500_.jpg', TRUE),
(78, 'https://m.media-amazon.com/images/I/71pPr7c+R8L._AC_SL1500_.jpg', TRUE),
(79, 'https://m.media-amazon.com/images/I/715qi-cIbML._AC_SL1500_.jpg', TRUE),
(80, 'https://m.media-amazon.com/images/I/81dE3URt9BL._AC_SL1500_.jpg', TRUE),
(81, 'https://m.media-amazon.com/images/I/714GHCZrlEL._AC_SL1500_.jpg', TRUE),
(82, 'https://m.media-amazon.com/images/I/61OByUf1TfL._AC_SL1500_.jpg', TRUE);

-- Reset sequences
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
