const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function setupDatabase() {
    try {
        console.log('Reading schema.sql...');
        const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        console.log('Reading seed.sql...');
        const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

        console.log('Connecting to database...');
        const client = await pool.connect();

        try {
            console.log('Executing schema.sql...');
            await client.query(schemaSql);
            console.log('Schema created successfully.');

            console.log('Executing seed.sql...');
            await client.query(seedSql);
            console.log('Database seeded successfully.');
        } finally {
            client.release();
        }

        console.log('Database setup complete!');
    } catch (err) {
        console.error('Error during database setup:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

setupDatabase();
