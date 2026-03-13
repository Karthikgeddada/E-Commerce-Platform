// find-max-id.js - Query the database to find the current max product ID
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT MAX(id) as max_id, COUNT(*) as total FROM products;');
        console.log('Max product ID:', res.rows[0].max_id);
        console.log('Total products:', res.rows[0].total);
    } finally {
        client.release();
        await pool.end();
    }
}
run();
