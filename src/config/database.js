import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,                 // maximum connections in the pool
    idleTimeoutMillis: 30000 // close idle connections after 30s
})

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(1);
})

export const query = (text, params) => pool.query(text, params);
export default pool;