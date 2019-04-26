import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
// if (process.env.NODE_ENV === 'test') {
//   connectionString = process.env.DB_URL_TEST;
// } else {
//   connectionString = process.env.DATABASE_URL;
// }

const db = new Pool({ connectionString });

export default db;
