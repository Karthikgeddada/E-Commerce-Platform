const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('📦 Running final updates...');

        const batches = [
            'final-batch.sql',   // Books, Shoes, Fashion, Watches
            'add-kitchen.sql',   // Kitchen items
            'add-garden.sql'     // Garden items
        ];

        for (const batch of batches) {
            console.log(`🚀 Running ${batch}...`);
            const sql = fs.readFileSync(`./${batch}`, 'utf8');
            await pool.query(sql);
            console.log(`✅ ${batch} completed.`);
        }

        const count = await pool.query('SELECT COUNT(*) FROM products');
        console.log(`\n📊  Total products in database: ${count.rows[0].count}`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

run();
