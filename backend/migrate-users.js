const db = require('./config/db');

async function migrate() {
    try {
        console.log('Starting migration: Adding reset password columns to users table...');

        await db.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS reset_password_token VARCHAR(255),
            ADD COLUMN IF NOT EXISTS reset_password_expires TIMESTAMP;
        `);

        console.log('Migration successful: Columns added.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
