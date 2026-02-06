const { Account } = require('../src/models');
const db = require('../src/models');

async function promoteUser() {
    try {
        const username = 'roy'; // Target user
        const newRole = 'superadmin';

        const account = await Account.findOne({ where: { username } });

        if (!account) {
            console.log(`User '${username}' not found.`);
            return;
        }

        console.log(`Current role for ${username}: ${account.role}`);

        await account.update({ role: newRole });

        console.log(`Updated ${username} to role: ${newRole}`);
        console.log('You can now perform administrative actions.');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await db.sequelize.close();
    }
}

promoteUser();
