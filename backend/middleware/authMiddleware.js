const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Skip auth check for preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

        const token = authHeader.split(/\s+/)[1]; // handle multiple spaces

        // Strict secret check
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('CRITICAL: JWT_SECRET is not defined in environment variables');
            // If the secret is missing in production, we should handle it safely
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }

        const decoded = jwt.verify(token, secret);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        console.error('--- AUTH ERROR ---');
        console.error('Token:', token ? token.substring(0, 10) + '...' : 'none');
        console.error('Error:', error.name, error.message);

        let message = 'Token is not valid';
        if (error.name === 'TokenExpiredError') {
            message = 'Token has expired';
        } else if (error.name === 'JsonWebTokenError') {
            message = 'Invalid token signature';
        }
        return res.status(401).json({ success: false, message });
    }
};

module.exports = authMiddleware;
