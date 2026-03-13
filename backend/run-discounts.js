const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('🚀 Running add-discounts.sql...');
        const sql = fs.readFileSync('./add-discounts.sql', 'utf8');
        await pool.query(sql);
        console.log('✅ add-discounts.sql completed.');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
