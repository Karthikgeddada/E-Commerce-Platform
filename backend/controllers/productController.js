const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, minRating, offersOnly } = req.query;
        let query = `
            SELECT p.*, c.name as category_name, 
            (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
        `;
        const params = [];
        const whereClauses = [];

        if (search) {
            whereClauses.push(`p.name ILIKE $${params.length + 1}`);
            params.push(`%${search}%`);
        }
        if (category) {
            if (category === 'Fresh' || category === 'Amazon Fresh') {
                whereClauses.push(`(c.name = 'Amazon Fresh' OR (c.name = 'Grocery & Gourmet Foods' AND p.name ILIKE 'Fresh %'))`);
            } else {
                whereClauses.push(`c.name = $${params.length + 1}`);
                params.push(category);
            }
        }
        if (minRating) {
            whereClauses.push(`p.rating >= $${params.length + 1}`);
            params.push(parseFloat(minRating));
        }
        if (offersOnly === 'true') {
            whereClauses.push(`p.old_price IS NOT NULL`);
        }

        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        // Add sorting logic
        const { sort } = req.query;
        if (sort === 'Price: Low to High') {
            query += ' ORDER BY p.price ASC';
        } else if (sort === 'Price: High to Low') {
            query += ' ORDER BY p.price DESC';
        } else if (sort === 'Avg. Customer Review') {
            query += ' ORDER BY p.rating DESC';
        } else if (sort === 'Discount: High to Low') {
            // Sort by discount percentage (p.old_price - p.price) / p.old_price
            query += ' ORDER BY (p.old_price - p.price) / p.old_price DESC NULLS LAST';
        } else {
            // Default "Featured" shows fruits first, then newest products
            query += ` ORDER BY 
                CASE 
                    WHEN (c.name = 'Grocery & Gourmet Foods' OR c.name = 'Amazon Fresh') AND p.name ILIKE 'Fresh %' AND (
                         p.name ILIKE '%Apple%' OR p.name ILIKE '%Banana%' OR p.name ILIKE '%Orange%' 
                         OR p.name ILIKE '%Pomegranate%' OR p.name ILIKE '%Strawberry%' OR p.name ILIKE '%Grapes%' 
                         OR p.name ILIKE '%Mango%' OR p.name ILIKE '%Papaya%' OR p.name ILIKE '%Guava%' 
                         OR p.name ILIKE '%Watermelon%' OR p.name ILIKE '%Coconut%' OR p.name ILIKE '%Mosambi%'
                    ) THEN 0 
                    WHEN (c.name = 'Grocery & Gourmet Foods' OR c.name = 'Amazon Fresh') AND (
                         p.name ILIKE '%Apple%' OR p.name ILIKE '%Banana%' OR p.name ILIKE '%Orange%' 
                         OR p.name ILIKE '%Pomegranate%' OR p.name ILIKE '%Strawberry%' OR p.name ILIKE '%Grapes%' 
                         OR p.name ILIKE '%Mango%' OR p.name ILIKE '%Papaya%' OR p.name ILIKE '%Guava%' 
                         OR p.name ILIKE '%Watermelon%' OR p.name ILIKE '%Coconut%' OR p.name ILIKE '%Mosambi%'
                    ) THEN 1
                    ELSE 2 END, 
                p.id DESC`;
        }

        const result = await db.query(query, params);
        res.json({ success: true, count: result.rows.length, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productResult = await db.query(`
            SELECT p.*, c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1
        `, [id]);

        if (productResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const imagesResult = await db.query('SELECT * FROM product_images WHERE product_id = $1', [id]);

        const product = productResult.rows[0];
        product.images = imagesResult.rows;

        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
