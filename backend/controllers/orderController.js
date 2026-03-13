const db = require('../config/db');
const emailService = require('../services/emailService');

exports.createOrder = async (req, res) => {
    const client = await db.pool.connect();
    const userId = req.user.id;
    try {
        await client.query('BEGIN');
        const { shippingDetails, totalAmount } = req.body;
        console.log('--- START ORDER CREATION ---');
        console.log('User ID:', userId);
        console.log('Shipping Details:', shippingDetails);
        console.log('Total Amount:', totalAmount);

        // 1. Create Order
        const orderResult = await client.query(`
            INSERT INTO orders 
            (user_id, total_amount, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip_code, shipping_phone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [
            userId,
            totalAmount,
            shippingDetails.name,
            shippingDetails.address,
            shippingDetails.city,
            shippingDetails.state,
            shippingDetails.zipCode,
            shippingDetails.phone
        ]);

        const orderId = orderResult.rows[0].id;
        const orderDate = new Date(orderResult.rows[0].created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

        // 2. Get items from cart
        const cartItems = await client.query(`
            SELECT ci.*, p.name, p.price 
            FROM cart_items ci 
            JOIN products p ON ci.product_id = p.id 
            WHERE ci.user_id = $1
        `, [userId]);

        if (cartItems.rows.length === 0) {
            throw new Error('Cannot create order with an empty cart.');
        }

        // 3. Move items to order_items
        for (const item of cartItems.rows) {
            await client.query(`
                INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
                VALUES ($1, $2, $3, $4)
            `, [orderId, item.product_id, item.quantity, item.price || 0]);
        }

        // 4. Clear cart
        await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

        // 5. Get user email for notification
        const userResult = await client.query('SELECT email FROM users WHERE id = $1', [userId]);
        const userEmail = userResult.rows[0]?.email;

        console.log('Order created successfully:', orderId);
        await client.query('COMMIT');

        // Send email notification (truly asynchronous)
        emailService.sendOrderConfirmationEmail(userEmail, {
            orderId,
            orderDate,
            items: cartItems.rows,
            totalAmount,
            shippingDetails
        }).catch(err => console.error('Delayed email failure:', err));

        res.json({ success: true, orderId: orderId });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('--- ORDER CREATION ERROR ---');
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        client.release();
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [id]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const itemsResult = await db.query(`
            SELECT oi.*, p.name, 
            (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
            FROM order_items oi
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = $1
        `, [id]);

        const order = orderResult.rows[0];
        order.items = itemsResult.rows;

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.id;
        const { status } = req.query;
        let query = 'SELECT * FROM orders WHERE user_id = $1';
        const params = [userId];

        if (status) {
            query += ' AND status = $2';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);

        // Fetch items for each order
        const orders = [];
        for (const order of result.rows) {
            const items = await db.query(`
                SELECT oi.*, p.name, 
                (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
                FROM order_items oi
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = $1
            `, [order.id]);
            order.items = items.rows;
            orders.push(order);
        }

        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify ownership and check if already cancelled or shipped
        const orderResult = await db.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [id, userId]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const order = orderResult.rows[0];

        if (order.status === 'Cancelled') {
            return res.status(400).json({ success: false, message: 'Order is already cancelled' });
        }

        if (order.status === 'Shipped' || order.status === 'Delivered') {
            return res.status(400).json({ success: false, message: 'Cannot cancel an order that has already been shipped or delivered' });
        }

        await db.query('UPDATE orders SET status = $1 WHERE id = $2', ['Cancelled', id]);

        res.json({ success: true, message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
