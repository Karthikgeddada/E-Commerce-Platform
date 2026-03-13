const db = require('./config/db');
async function check() {
    try {
        const r = await db.query('SELECT * FROM users WHERE email = $1', ['e23cseu1877@bennett.edu.in']);
        console.log('RESULT:', JSON.stringify(r.rows));
    } catch (e) {
        console.error('DB ERROR:', e);
    } finally {
        process.exit();
    }
}
check();
