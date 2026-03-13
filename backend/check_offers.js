const db = require('./config/db');
require('dotenv').config();

async function checkOffers() {
    try {
        const result = await db.query('SELECT id, name, price, old_price FROM products WHERE old_price IS NOT NULL LIMIT 10');
        console.log('Products with offers:', result.rows);

        if (result.rows.length < 20) {
            console.log('Not enough products with offers. Updating more products...');

            // Set ~30% discount for Electronics (Category 17)
            await db.query(`UPDATE products SET old_price = ROUND(price / 0.7 * 100) / 100 WHERE category_id = 17 AND old_price IS NULL`);

            // Set ~40% discount for Clothing (Category 13)
            await db.query(`UPDATE products SET old_price = ROUND(price / 0.6 * 100) / 100 WHERE category_id = 13 AND old_price IS NULL`);

            // Set ~25% discount for Beauty (Category 10)
            await db.query(`UPDATE products SET old_price = ROUND(price / 0.75 * 100) / 100 WHERE category_id = 10 AND old_price IS NULL`);

            // Set ~50% discount for some items as "Limited time deal"
            await db.query(`UPDATE products SET old_price = price * 2 WHERE id % 7 = 0 AND old_price IS NULL`);

            console.log('Updated products with tiered discounts for testing.');
        }
    } catch (error) {
        console.error('Error checking offers:', error);
    } finally {
        process.exit();
    }
}

checkOffers();
