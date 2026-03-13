const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function checkOrder8() {
    try {
        console.log('Checking Order 8...');
        const res = await pool.query('SELECT * FROM order_items WHERE order_id = 8');
        console.log('Items in Order 8:', JSON.stringify(res.rows, null, 2));

        const res2 = await pool.query('SELECT * FROM products');
        console.log('Product count:', res2.rows.length);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkOrder8();
