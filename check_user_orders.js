const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function checkOrders() {
    try {
        console.log('Checking orders and users...');
        const res = await pool.query('SELECT id, user_id, shipping_name FROM orders ORDER BY id ASC');
        console.log('All orders in system:', JSON.stringify(res.rows, null, 2));

        const resUsers = await pool.query('SELECT id, name FROM users');
        console.log('All users in system:', JSON.stringify(resUsers.rows, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

checkOrders();
