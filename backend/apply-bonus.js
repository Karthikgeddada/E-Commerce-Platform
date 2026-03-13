const db = require('./config/db');
const fs = require('fs');
const path = require('path');

async function applyBonusSchema() {
    try {
        const schema = fs.readFileSync(path.join(__dirname, 'bonus-schema.sql'), 'utf8');
        await db.query(schema);
        console.log('Bonus schema applied successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error applying bonus schema:', err);
        process.exit(1);
    }
}

applyBonusSchema();
