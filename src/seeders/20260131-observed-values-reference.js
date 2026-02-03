'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const observedValues = [
            // Maka-Diyos
            { coreValue: 'Maka-Diyos', behaviorStatement: 'Observes simplicity and modesty in style, words and actions', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Maka-Diyos', behaviorStatement: 'Relays information properly, exercising prudence', createdAt: new Date(), updatedAt: new Date() },

            // Makatao
            { coreValue: 'Makatao', behaviorStatement: 'Shows honesty and truthfulness', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makatao', behaviorStatement: 'Acts positively on corrections and suggestions', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makatao', behaviorStatement: 'Exhibits acts of compassion for others especially the needy', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makatao', behaviorStatement: 'Observes cleanliness and neatness', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makatao', behaviorStatement: 'Participates actively in class and school activities', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makatao', behaviorStatement: 'Takes responsibility on assigned tasks and duties', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makatao', behaviorStatement: 'Is friendly to all and does not discriminate', createdAt: new Date(), updatedAt: new Date() },

            // Makakalikasan
            { coreValue: 'Makakalikasan', behaviorStatement: 'Takes care of school facilities and things borrowed', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makakalikasan', behaviorStatement: 'Displays concern of the environment', createdAt: new Date(), updatedAt: new Date() },

            // Makabansa
            { coreValue: 'Makabansa', behaviorStatement: 'Shows respect and politeness', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makabansa', behaviorStatement: 'Is ready to work/cooperate in class activities', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makabansa', behaviorStatement: 'Manages time well, practices promptness in submitting requirements', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makabansa', behaviorStatement: 'Follows rules and regulations, encourages others to do the same', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makabansa', behaviorStatement: 'Observes punctuality in coming to school', createdAt: new Date(), updatedAt: new Date() },
            { coreValue: 'Makabansa', behaviorStatement: 'Submits reply slips on time', createdAt: new Date(), updatedAt: new Date() },
        ];

        // Note: This seeder is for reference. ObservedValues are typically added per student.
        console.log('Observed Values reference data loaded. Use these statements when adding student values.');
    },

    async down(queryInterface, Sequelize) {
        // No action needed
    }
};
