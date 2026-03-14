const db = require('./config/db');
require('dotenv').config();

async function fixFashion() {
    try {
        console.log('--- STARTING FASHION CATEGORY FIX ---');

        // 1. Move all products from 'Clothing & Accessories' (ID 13) to 'Amazon Fashion' (ID 3)
        const moveResult = await db.query(`
            UPDATE products 
            SET category_id = 3 
            WHERE category_id = 13
        `);
        console.log(`Moved ${moveResult.rowCount} products from category 13 to category 3.`);

        // 2. Clear out any duplicates if necessary (unlikely given IDs)

        // 3. Add some extra high-quality premium items directly to Category 3
        const premiumProducts = [
            {
                name: "Levi's Men's 511 Slim Fit Jeans",
                description: "Classic slim fit jeans with a modern look. Durable and comfortable for daily wear.",
                price: 2599.00,
                category_id: 3,
                rating: 4.5,
                num_reviews: 1200,
                image: "https://m.media-amazon.com/images/I/81xXyEYJ+ML._AC_SL1500_.jpg",
                specs: { "Brand": "Levi's", "Fit": "Slim", "Material": "99% Cotton, 1% Elastane" }
            },
            {
                name: "Adidas Men's Stan Smith Sustainable Sneakers",
                description: "Iconic tennis shoes reimagined for today. Clean, minimalist design that goes with anything.",
                price: 7999.00,
                category_id: 3,
                rating: 4.8,
                num_reviews: 3500,
                image: "https://m.media-amazon.com/images/I/61S-rVf6P-L._AC_SL1500_.jpg",
                specs: { "Brand": "Adidas", "Type": "Sneakers", "Color": "White/Green" }
            },
            {
                name: "Max Women's Floral Print A-Line Kurta",
                description: "A beautiful floral print kurta perfect for casual outings and office wear.",
                price: 1299.00,
                category_id: 3,
                rating: 4.4,
                num_reviews: 850,
                image: "https://m.media-amazon.com/images/I/71YyM+E6Y3L._AC_SL1500_.jpg",
                specs: { "Brand": "Max", "Type": "Kurta", "Material": "Viscose" }
            }
        ];

        for (const p of premiumProducts) {
            // Check if exists
            const exists = await db.query('SELECT id FROM products WHERE name = $1', [p.name]);
            if (exists.rows.length === 0) {
                const res = await db.query(
                    'INSERT INTO products (category_id, name, description, price, stock_quantity, rating, num_reviews, specifications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
                    [p.category_id, p.name, p.description, p.price, 100, p.rating, p.num_reviews, p.specs]
                );
                const productId = res.rows[0].id;
                await db.query(
                    'INSERT INTO product_images (product_id, image_url, is_primary) VALUES ($1, $2, $3)',
                    [productId, p.image, true]
                );
                console.log(`Added premium product: ${p.name}`);
            }
        }

        console.log('--- FASHION CATEGORY FIX COMPLETE ---');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        process.exit();
    }
}

fixFashion();
