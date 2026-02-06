const { Account } = require('../models');

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find account by username
        const account = await Account.findOne({ where: { username } });

        if (!account) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password (plain text comparison for now - should use bcrypt in production)
        if (account.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if account is active
        if (account.isActive === false) {
            return res.status(401).json({ error: 'Account is deactivated' });
        }

        // Return user info (in production, would generate JWT token here)
        const { password: _, ...userData } = account.toJSON();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: `mock-jwt-token-${account.id}`, // Placeholder for JWT
            user: userData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        // In production, would invalidate JWT token here
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get current user (from token)
exports.getMe = async (req, res) => {
    try {
        // In production, would decode JWT token and get user ID
        // For now, we'll use a header or query param to simulate
        const userId = req.headers['x-user-id'] || req.query.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const account = await Account.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!account) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
