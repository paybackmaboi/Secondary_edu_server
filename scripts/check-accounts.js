const { Account } = require('../src/models');
const db = require('../src/models');

async function listAccounts() {
    try {
        const accounts = await Account.findAll();
        console.log('--- Account List ---');
        console.log('ID | Username | Role');
        console.log('---|----------|-----');
        accounts.forEach(acc => {
            console.log(`${acc.id} | ${acc.username} | ${acc.role}`);
        });
        console.log('--------------------');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await db.sequelize.close();
    }
}

listAccounts();
