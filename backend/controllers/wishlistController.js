const db = require('../config/db');

exports.getWishlist = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT w.id as wishlist_id, p.*, 
            (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
            FROM wishlist w
            JOIN products p ON w.product_id = p.id
            WHERE w.user_id = $1
        `, [req.user.id]);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { product_id } = req.body;
        const result = await db.query(
            'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT (user_id, product_id) DO NOTHING RETURNING *',
            [req.user.id, product_id]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM wishlist WHERE id = $1 AND user_id = $2', [id, req.user.id]);
        res.json({ success: true, message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
