import pg from 'pg';
import configuration from './configuration/configuration';

const { Pool } = pg;
let connectionConfig;
if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test') {
  connectionConfig = 'development';
} else if (process.env.NODE_ENV !== 'production') {
  connectionConfig = 'test';
} else {
  connectionConfig = 'production';
}
const connectionSettings = configuration[connectionConfig];
const db = new Pool(connectionSettings);

export default db;
