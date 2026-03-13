const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('📦 Adding old_price column...');
        await pool.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS old_price DECIMAL(10, 2);');
        console.log('✅ Column added successfully.');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
