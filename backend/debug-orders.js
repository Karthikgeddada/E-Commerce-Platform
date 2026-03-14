const db = require('./config/db');
require('dotenv').config();

async function checkUserAndOrders() {
    try {
        const users = await db.query('SELECT id, name, email FROM users ORDER BY id DESC LIMIT 5');
        console.log('Recent Users:', users.rows);

        const lastOrder = await db.query(`
            SELECT o.*, u.email 
            FROM orders o 
            JOIN users u ON o.user_id = u.id 
            ORDER BY o.created_at DESC 
            LIMIT 1
        `);
        console.log('Last Order details:', lastOrder.rows[0]);
    } catch (error) {
        console.error('Database check failed:', error);
    } finally {
        process.exit();
    }
}

checkUserAndOrders();
