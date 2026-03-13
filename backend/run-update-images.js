const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function updateImages() {
    const sql = fs.readFileSync('./update-images.sql', 'utf8');
    try {
        await pool.query(sql);
        console.log('✅ All 50 product images updated successfully!');

        // Verify
        const result = await pool.query('SELECT COUNT(*) FROM product_images');
        console.log(`📊 Total images in DB: ${result.rows[0].count}`);

        const sample = await pool.query('SELECT pi.product_id, p.name, pi.image_url FROM product_images pi JOIN products p ON p.id = pi.product_id ORDER BY pi.product_id LIMIT 5');
        console.log('\n🖼️  Sample images:');
        sample.rows.forEach(r => console.log(`  ${r.product_id}. ${r.name}: ${r.image_url.substring(0, 60)}...`));
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

updateImages();
