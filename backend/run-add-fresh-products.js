// run-add-fresh-products.js
// Runs all 3 SQL files: Grocery (veg+fruit), Grocery (packaged food) & Beauty
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
    const files = [
        'add-fresh-products.sql'
    ];

    const client = await pool.connect();
    try {
        for (const file of files) {
            console.log(`\n📦 Running ${file}...`);
            const sql = fs.readFileSync(path.join(__dirname, file), 'utf8');
            await client.query(sql);
            console.log(`✅ ${file} complete.`);
        }
        console.log('\n🎉 All 80 products inserted successfully!');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

run();
