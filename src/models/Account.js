const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            // Define associations here if needed
        }

        // Method to validate password
        async validatePassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }

    Account.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('superadmin', 'admin', 'teacher', 'user'),
            defaultValue: 'user'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Account',
        hooks: {
            beforeCreate: async (account) => {
                if (account.password) {
                    const salt = await bcrypt.genSalt(10);
                    account.password = await bcrypt.hash(account.password, salt);
                }
            },
            beforeUpdate: async (account) => {
                if (account.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    account.password = await bcrypt.hash(account.password, salt);
                }
            }
        }
    });

    return Account;
};
