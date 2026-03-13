const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('🖼️  Adding Home Decor items...');
        const sql = fs.readFileSync('./add-decor.sql', 'utf8');
        await pool.query(sql);
        console.log('✅ Home Decor items added successfully!');

        const count = await pool.query('SELECT COUNT(*) FROM products');
        console.log(`📊 Total products now: ${count.rows[0].count}`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
