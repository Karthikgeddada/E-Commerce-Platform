const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    const sql = fs.readFileSync('./add-controllers.sql', 'utf8');
    try {
        await pool.query(sql);
        console.log('✅ New controllers added and product 43 updated!');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
