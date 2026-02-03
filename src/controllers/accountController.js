const { Account } = require('../models');

// Create a new account
exports.createAccount = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if username or email already exists
        const existingAccount = await Account.findOne({
            where: {
                [require('sequelize').Op.or]: [{ username }, { email }]
            }
        });

        if (existingAccount) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const account = await Account.create({ username, email, password, role });

        // Return account without password
        const { password: _, ...accountData } = account.toJSON();
        res.status(201).json(accountData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all accounts
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get account by ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update account
exports.updateAccount = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const { username, email, password, role, isActive } = req.body;

        // Check if username or email already exists (excluding current account)
        if (username || email) {
            const existingAccount = await Account.findOne({
                where: {
                    [require('sequelize').Op.and]: [
                        {
                            [require('sequelize').Op.or]: [
                                username ? { username } : {},
                                email ? { email } : {}
                            ]
                        },
                        {
                            id: { [require('sequelize').Op.ne]: req.params.id }
                        }
                    ]
                }
            });

            if (existingAccount) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
        }

        await account.update({ username, email, password, role, isActive });

        // Return account without password
        const { password: _, ...accountData } = account.toJSON();
        res.status(200).json(accountData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete account
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        await account.destroy();
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
