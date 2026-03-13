const db = require('../config/db');

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query(`
            SELECT ci.*, p.name, p.price, p.stock_quantity,
            (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = $1
        `, [userId]);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity } = req.body;

        // Check if item already exists in cart
        const existing = await db.query('SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, product_id]);

        if (existing.rows.length > 0) {
            const newQuantity = existing.rows[0].quantity + (quantity || 1);
            const result = await db.query('UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *', [newQuantity, existing.rows[0].id]);
            return res.json({ success: true, data: result.rows[0] });
        }

        const result = await db.query(
            'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [userId, product_id, quantity || 1]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cart_item_id, quantity } = req.body;

        // Ensure user owns the cart item
        const check = await db.query('SELECT * FROM cart_items WHERE id = $1 AND user_id = $2', [cart_item_id, userId]);
        if (check.rows.length === 0) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        if (quantity < 1) {
            await db.query('DELETE FROM cart_items WHERE id = $1', [cart_item_id]);
            return res.json({ success: true, message: 'Item removed from cart' });
        }
        const result = await db.query('UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *', [quantity, cart_item_id]);
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        await db.query('DELETE FROM cart_items WHERE id = $1 AND user_id = $2', [id, userId]);
        res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
