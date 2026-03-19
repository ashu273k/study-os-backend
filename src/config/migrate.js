// src/config/migrate.js
import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const runMigration = async () => {
  const client = await pool.connect();
  try {
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');

    await client.query('BEGIN');

    // Let PostgreSQL parse the full SQL file to avoid fragile client-side splitting.
    await client.query(schema);

    await client.query('COMMIT');
    console.log('Schema created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed, rolled back:', error.message);
    if (error.position) {
      console.error('Error position in SQL:', error.position);
    }
  } finally {
    client.release();
    await pool.end();
  }
};

runMigration();