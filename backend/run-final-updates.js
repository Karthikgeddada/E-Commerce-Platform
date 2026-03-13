const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('📚 Adding Books...');
        const booksSql = fs.readFileSync('./add-books.sql', 'utf8');
        await pool.query(booksSql);
        console.log('✅ Books added!');

        console.log('👟 Adding Shoes...');
        const shoesSql = fs.readFileSync('./add-shoes.sql', 'utf8');
        await pool.query(shoesSql);
        console.log('✅ Shoes added!');

        const count = await pool.query('SELECT COUNT(*) FROM products');
        console.log(`📊 Total products now: ${count.rows[0].count}`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
