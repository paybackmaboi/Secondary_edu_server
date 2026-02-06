/**
 * Database Index Cleanup Script
 * Run this script to fix the "Too many keys specified" error
 * Usage: node scripts/fix-indexes.js
 */

const db = require('../src/models');

async function fixDuplicateIndexes() {
    try {
        console.log('Connecting to database...');

        // Get all indexes on Accounts table
        const [indexes] = await db.sequelize.query(
            `SHOW INDEX FROM Accounts WHERE Key_name != 'PRIMARY'`
        );

        console.log(`Found ${indexes.length} non-primary indexes on Accounts table`);

        // Group by column name to find duplicates
        const indexesByColumn = {};
        indexes.forEach(idx => {
            const key = `${idx.Column_name}`;
            if (!indexesByColumn[key]) {
                indexesByColumn[key] = [];
            }
            indexesByColumn[key].push(idx.Key_name);
        });

        // Drop duplicate indexes (keep only one per column)
        for (const [column, keyNames] of Object.entries(indexesByColumn)) {
            if (keyNames.length > 1) {
                console.log(`\nColumn '${column}' has ${keyNames.length} indexes: ${keyNames.join(', ')}`);

                // Keep the first index, drop the rest
                for (let i = 1; i < keyNames.length; i++) {
                    const keyToDrop = keyNames[i];
                    console.log(`  Dropping duplicate index: ${keyToDrop}`);
                    try {
                        await db.sequelize.query(`ALTER TABLE Accounts DROP INDEX \`${keyToDrop}\``);
                        console.log(`  ✓ Dropped ${keyToDrop}`);
                    } catch (err) {
                        console.log(`  ✗ Failed to drop ${keyToDrop}: ${err.message}`);
                    }
                }
            }
        }

        // Show remaining indexes
        const [remainingIndexes] = await db.sequelize.query(
            `SHOW INDEX FROM Accounts WHERE Key_name != 'PRIMARY'`
        );
        console.log(`\nRemaining indexes: ${remainingIndexes.length}`);
        remainingIndexes.forEach(idx => {
            console.log(`  - ${idx.Key_name} on ${idx.Column_name}`);
        });

        console.log('\n✓ Database cleanup complete! You can now restart the server.');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await db.sequelize.close();
        process.exit(0);
    }
}

fixDuplicateIndexes();
