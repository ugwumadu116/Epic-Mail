import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  development: {
    user: process.env.LOCALDBUSER,
    password: process.env.LOCALDBPSWD,
    database: process.env.LOCALDB,
    host: process.env.LOCALDBHOST,
    port: process.env.LOCALDBPORT,
  },
  production: {
    user: process.env.HEROKUDBUSER,
    password: process.env.HEROKUDBPSWD,
    database: process.env.HEROKUDB,
    host: process.env.HEROKUDBHOST,
    port: process.env.HEROKDBPORT,
  },
  test: {
    user: 'user',
    password: 'user',
    database: 'testdb',
    host: '127.0.0.1',
    max: 10,
    idleTimeoutMillis: 6000,
    connectionTimeoutMillis: 9000,
  },
};

export default configuration;
