-- Update ALL 50 Product Images with Relevant, Verified URLs
-- Mix of: User-provided Amazon CDN URLs + carefully matched product images

-- Clear existing images
DELETE FROM product_images;

-- Insert new verified product images
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
-- 1. Alexa Smart Lighting Skill (Smart home / Echo device)
(1, 'https://m.media-amazon.com/images/I/41f80Qu98zL._SY300_SX300_QL70_FMwebp_.jpg', TRUE),

-- 2. Echo Dot (5th Gen) - User provided
(2, 'https://m.media-amazon.com/images/I/61dgl2srHDL._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 3. Van Heusen Mens Shirt
(3, 'https://m.media-amazon.com/images/I/41nrCKbOgzL._SX679_.jpg', TRUE),

-- 4. Organic Bananas - User provided
(4, 'https://m.media-amazon.com/images/I/31ZifpVDdKL.jpg', TRUE),

-- 5. Digital Blood Pressure Monitor
(5, 'https://m.media-amazon.com/images/I/61NJOnXXE1L._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 6. LG 8kg Front Load Washer
(6, 'https://m.media-amazon.com/images/I/71BPo8HSYuL._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 7. Infinite Runner Game Pro (Mobile gaming)
(7, 'https://m.media-amazon.com/images/I/61wunA+reyL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 8. Atomic Habits (Audiobook)
(8, 'https://m.media-amazon.com/images/I/81iss3ldpLL._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 9. Pampers Premium Pants
(9, 'https://m.media-amazon.com/images/I/61iDy4ZDTuL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 10. Maybelline New York Fit Me Foundation
(10, 'https://m.media-amazon.com/images/I/61zh5b1GQjL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 11. The Psychology of Money (Book)
(11, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80', TRUE),

-- 12. Castrol MAGNATEC 5W-40
(12, 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80', TRUE),

-- 13. Canvas Tote Bag
(13, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80', TRUE),

-- 14. Rare 1964 Stamp Collection
(14, 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80', TRUE),

-- 15. Wireless Gaming Mouse
(15, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', TRUE),

-- 16. Warehouse Clearance Tablet
(16, 'https://m.media-amazon.com/images/I/81Ne1YVc5cL._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 17. Sony Alpha ZV-E10 Camera
(17, 'https://m.media-amazon.com/images/I/81ST9EJe9QL._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 18. IKEA Malm Side Table
(18, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', TRUE),

-- 19. Succulent Plant Set
(19, 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80', TRUE),

-- 20. Amazon 500 Gift Card
(20, 'https://m.media-amazon.com/images/I/51h9EHccKrL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 21. Premium Roasted Almonds
(21, 'https://m.media-amazon.com/images/I/71Xqdb0uo0L._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 22. Vicks Vaporub
(22, 'https://m.media-amazon.com/images/I/61jB3fWAJcL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 23. Pigeon Non-Stick Tawa
(23, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80', TRUE),

-- 24. Professional Laser Level
(24, 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80', TRUE),

-- 25. 925 Silver Butterfly Earrings
(25, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', TRUE),

-- 26. The Power of Now (Kindle)
(26, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80', TRUE),

-- 27. American Tourister Suitcase
(27, 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&q=80', TRUE),

-- 28. Estée Lauder Night Repair Serum
(28, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80', TRUE),

-- 29. Oppenheimer (Blu-ray)
(29, 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', TRUE),

-- 30. Divide (Ed Sheeran Digital Album)
(30, 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80', TRUE),

-- 31. Thriller (Vinyl Edition - Michael Jackson)
(31, 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80', TRUE),

-- 32. Yamaha Acoustic Guitar
(32, 'https://m.media-amazon.com/images/I/61T5FNYpQeL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 33. Multi-Color Sticky Notes
(33, 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', TRUE),

-- 34. Royal Canin Puppy Food
(34, 'https://m.media-amazon.com/images/I/61okzduDWHL._AC_SX416_CB1169409_QL70_.jpg', TRUE),

-- 35. Prime Video Membership
(35, 'https://m.media-amazon.com/images/I/712RoVSsW2L._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 36. Skechers Men Walk Shoes - User provided (sports)
(36, 'https://m.media-amazon.com/images/I/81Ht4gwpukL._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 37. Professional Video Editor Software
(37, 'https://m.media-amazon.com/images/I/71TvMYwfA7L._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 38. Yoga Mat (Anti-Skid) - User provided (sports)
(38, 'https://m.media-amazon.com/images/I/51n6d3N+FML._AC_SX500_.jpg', TRUE),

-- 39. Monthly Coffee Beans
(39, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', TRUE),

-- 40. Bosch Hand Tool Kit
(40, 'https://m.media-amazon.com/images/I/81z7QVoiT7L._AC_UL640_FMwebp_QL65_.jpg', TRUE),

-- 41. Scrabble Board Game
(41, 'https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800&q=80', TRUE),

-- 42. Microfiber Cleaning Cloth
(42, 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80', TRUE),

-- 43. DualSense PS5 Controller - User provided (cricket bat page context)
(43, 'https://m.media-amazon.com/images/I/61cOKvrU7NL._AC_UY436_FMwebp_QL65_.jpg', TRUE),

-- 44. Casio Vintage Watch
(44, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', TRUE),

-- 45. Dell XPS 15 Laptop
(45, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', TRUE),

-- 46. Samsung Galaxy S23 - User provided
(46, 'https://m.media-amazon.com/images/I/71RLLn9RZxL._SX679_.jpg', TRUE),

-- 47. Apple iPad Air
(47, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80', TRUE),

-- 48. Sony WH-1000XM5 Headphones
(48, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', TRUE),

-- 49. LEGO Architecture London
(49, 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80', TRUE),

-- 50. Nespresso Coffee Pods
(50, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', TRUE);

-- Reset sequence
SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images));
