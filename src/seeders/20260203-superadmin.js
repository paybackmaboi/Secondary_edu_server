'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('SuperAdmin@123', salt);

        await queryInterface.bulkInsert('Accounts', [{
            username: 'superadmin',
            email: 'superadmin@school.com',
            password: hashedPassword,
            role: 'superadmin',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Accounts', { username: 'superadmin' }, {});
    }
};
