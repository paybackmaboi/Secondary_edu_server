'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const subjects = [
            // Elementary Subjects
            { name: 'Mother Tongue', code: 'MTB', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Filipino', code: 'FIL', createdAt: new Date(), updatedAt: new Date() },
            { name: 'English', code: 'ENG', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Mathematics', code: 'MATH', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Science', code: 'SCI', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Araling Panlipunan', code: 'AP', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Edukasyon sa Pagpapakatao', code: 'ESP', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Music', code: 'MUS', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Arts', code: 'ARTS', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Physical Education', code: 'PE', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Health', code: 'HLTH', createdAt: new Date(), updatedAt: new Date() },
            { name: 'MAPEH', code: 'MAPEH', createdAt: new Date(), updatedAt: new Date() },
            { name: 'EPP / TLE', code: 'EPP', createdAt: new Date(), updatedAt: new Date() },

            // Junior High Specific
            { name: 'Technology and Livelihood Education', code: 'TLE', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Computer Education', code: 'COMP', createdAt: new Date(), updatedAt: new Date() },
        ];

        await queryInterface.bulkInsert('Subjects', subjects, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Subjects', null, {});
    }
};
