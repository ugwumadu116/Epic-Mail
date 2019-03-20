import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
let connectionSettings;
if (process.env.NODE_ENV !== 'production') {
  connectionSettings = process.env.DB_URL_TEST;
} else {
  connectionSettings = process.env.DB_URL;
}

const db = new Pool({ connectionSettings });

export default db;
