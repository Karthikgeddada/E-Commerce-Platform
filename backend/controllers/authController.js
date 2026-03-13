const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../services/emailService');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        const user = result.rows[0];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '7d' });

        res.status(201).json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiry = new Date(Date.now() + 3600000); // 1 hour

        await db.query(
            'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3',
            [token, expiry, email]
        );

        // Send email in background to prevent request hang
        emailService.sendPasswordResetEmail(email, token).catch(err => {
            console.error('Background Password Reset Email Failure:', err);
        });

        res.json({ success: true, message: 'Reset email sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const result = await db.query(
            'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > $2',
            [token, new Date()]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        const user = result.rows[0];
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query(
            'UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
            [hashedPassword, user.id]
        );

        res.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
