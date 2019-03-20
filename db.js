import connectDb from './api/connection';

const registeredUserTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE users (
 id serial PRIMARY KEY,
 firstname VARCHAR (50) NOT NULL,
 lastname VARCHAR (50) NOT NULL,
 epicmail VARCHAR (255) NOT NULL UNIQUE,
 password VARCHAR (255) NOT NULL,
 updatedat TIMESTAMP NOT NULL,
 createdat TIMESTAMP NOT NULL
);
`;

const UserContactTable = `
DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
  id serial PRIMARY KEY,
  firstname VARCHAR (50) NOT NULL,
  lastname VARCHAR (50) NOT NULL,
  epicmail VARCHAR (255) NOT NULL UNIQUE,
  password VARCHAR (255) NOT NULL,
  updateat TIMESTAMP NOT NULL,
  createdat TIMESTAMP NOT NULL
 );
 `;

const messageTable = `
DROP TABLE IF EXISTS message;
CREATE TABLE message (
  id serial PRIMARY KEY,
  userid int NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  senderemail VARCHAR(255) NOT NULL,
  receiveremail VARCHAR(255) NOT NULL,
  createdon TIMESTAMP NOT NULL,
  modifieddate TIMESTAMP,
  parentmessageid serial,  
  FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
`;

const sentMessageTable = `
DROP TABLE IF EXISTS sent;
CREATE TABLE sent (
  id serial PRIMARY KEY,
  senderid int NOT NULL,
  messageid  int NOT NULL,
  createdon TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'sent',
  FOREIGN KEY (messageid) REFERENCES message(id) ON DELETE CASCADE,
  FOREIGN KEY (senderid) REFERENCES users(id) ON DELETE CASCADE
);
`;

const inboxMessageTable = `
DROP TABLE IF EXISTS inbox;
CREATE TABLE inbox (
  id serial PRIMARY KEY,
  receiverid int NOT NULL,
  messageid  int NOT NULL,
  createdon TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  FOREIGN KEY (messageid) REFERENCES message(id) ON DELETE CASCADE,
  FOREIGN KEY (receiverid) REFERENCES users(id) ON DELETE CASCADE
);
`;

const groupMessageTable = `
DROP TABLE IF EXISTS usergroup;
CREATE TABLE usergroup (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
`;

const userGroupMessageTable = `
DROP TABLE IF EXISTS groupuser;
CREATE TABLE groupuser ( 
  id serial PRIMARY KEY,
  userid int NOT NULL,
  groupid int NOT NULL,
  createdon TIMESTAMP NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (groupid) REFERENCES usergroup(id) ON DELETE CASCADE
);
`;

const recipientMessageTable = `
DROP TABLE IF EXISTS recipientmessage;
CREATE TABLE recipientmessage (
  id serial PRIMARY KEY,
  receiverid int NOT NULL,
  messageid  int NOT NULL,
  recipientgroupid  int NOT NULL,
  createdon TIMESTAMP NOT NULL,
  FOREIGN KEY (messageid) REFERENCES message(id) ON DELETE CASCADE,
  FOREIGN KEY (recipientgroupid) REFERENCES usergroup(id) ON DELETE CASCADE,
  FOREIGN KEY (receiverid) REFERENCES users(id) ON DELETE CASCADE
);
`;

const dbQuery = `
${groupMessageTable}
${registeredUserTable}
${messageTable}
${UserContactTable}
${sentMessageTable}
${inboxMessageTable}
${userGroupMessageTable}
${recipientMessageTable}`;


connectDb.query(dbQuery)
  .then(() => process.exit())
  .catch((err) => {
    console.log(`Error from creating extensions ${err}`);
  });
