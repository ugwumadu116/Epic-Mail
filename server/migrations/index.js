import logger from '../config/logging';
import pool from '../config/db';

// logger();
pool.on('connect', () => {
  logger.info('Connected');
});

const drop = () => {
  const usersTable = 'DROP TABLE IF EXISTS usersx CASCADE';
  const messagesTable = 'DROP TABLE IF EXISTS messagesx CASCADE';
  const groupsTable = 'DROP TABLE IF EXISTS groupsx CASCADE';
  const groupMemberTable = 'DROP TABLE IF EXISTS groupMembersx CASCADE';
  const smsTable = 'DROP TABLE IF EXISTS smsx CASCADE';
  const resetCode = 'DROP TABLE IF EXISTS resetCodex CASCADE';
  const dropTables = `${usersTable};${messagesTable};${groupsTable};${groupMemberTable};${smsTable};${resetCode}`;

  pool.query(`${dropTables}`, (err) => {
    if (err) {
      logger.info(err);
    } else {
      logger.info('Tables dropped');
    }
    pool.end();
  });
};

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
  usersx(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    epicmail VARCHAR(100) UNIQUE NOT NULL,
    "phone" BIGINT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isadmin BOOLEAN DEFAULT FALSE
  )`;
  // message table
  const messagesTable = `CREATE TABLE IF NOT EXISTS
  messagesx(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    message VARCHAR(1600) NOT NULL,
    status TEXT NULL,
    senderid INTEGER NULL,
    receiverid INTEGER NULL,
    groupid INTEGER NULL,
    parentmessageid INTEGER DEFAULT 0,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_senderid FOREIGN KEY (senderid) REFERENCES  usersx (id),
    CONSTRAINT fk_receiverid FOREIGN KEY (receiverid) REFERENCES  usersx (id)
  )`;
  // group table
  const groupTable = `CREATE TABLE IF NOT EXISTS
  groupsx(
    id SERIAL PRIMARY KEY,
    name VARCHAR(600) UNIQUE NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // group member table
  const groupMembersTable = `CREATE TABLE IF NOT EXISTS
  groupMembersx(
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    groupid INTEGER NOT NULL,
    userrole VARCHAR(60) NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_groupid FOREIGN KEY (groupid) REFERENCES groupsx (id),
    CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES  usersx (id)
  )`;
  // SMS table
  const smsTable = `CREATE TABLE IF NOT EXISTS
  smsx(
    id SERIAL PRIMARY KEY,
    receiverphone INTEGER NOT NULL,
    message VARCHAR(150) NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  // Reset Password Code table
  const resetCodeTable = `CREATE TABLE IF NOT EXISTS
  resetCodex(
    id SERIAL PRIMARY KEY,
    phone INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    message VARCHAR(150) NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  const migrationQueries = `${usersTable};${messagesTable};${smsTable};${groupTable};${groupMembersTable};${resetCodeTable}`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      logger.info(err);
    } else {
      logger.info('Database migration successfully executed!');
    }
    pool.end();
  });
};

export { drop, create };
// export { drop, create, pool };

// eslint-disable-next-line eol-last
require('make-runnable/custom')({
  printOutputFrame: false,
});
