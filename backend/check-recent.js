const db = require('./config/db');
require('dotenv').config();

async function checkRecentOrders() {
    try {
        const result = await db.query(`
            SELECT o.id, o.created_at, u.email 
            FROM orders o 
            JOIN users u ON o.user_id = u.id 
            WHERE o.created_at > NOW() - INTERVAL '4 hours'
            ORDER BY o.created_at DESC
        `);
        console.log('Orders in last 4 hours:', result.rows);
    } catch (error) {
        console.error('Database check failed:', error);
    } finally {
        process.exit();
    }
}

checkRecentOrders();
