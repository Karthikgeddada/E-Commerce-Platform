const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    const sql = fs.readFileSync('./add-items.sql', 'utf8');
    try {
        await pool.query(sql);
        console.log('✅ New items added successfully!');

        const count = await pool.query('SELECT COUNT(*) FROM products');
        console.log(`📊 Total products now: ${count.rows[0].count}`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
