import { validationResult } from 'express-validator/check';
import db from '../config/db';

const userCheck = async (data) => {
  const errorFormatter = ({ msg }) => `${msg}`;
  await validationResult(data).formatWith(errorFormatter).throw();
};

const checkIfEmailExist = async (data) => {
  const sql = 'SELECT from usersx WHERE epicmail = $1';
  const bindingParameter = [data];
  const client = await db.connect();
  const result = await client.query(sql, bindingParameter);
  client.release();
  if (result.rowCount > 0) {
    throw new Error('email already exists');
  }
};

const checkIfLoginEmailExist = async (data) => {
  const sql = 'SELECT * from usersx WHERE epicmail = $1';
  const bindingParameter = [data];
  const client = await db.connect();
  const result = await client.query(sql, bindingParameter);
  client.release();
  if (result.rowCount <= 0) {
    throw new Error('invalid password or email');
  }
  return result.rows[0];

  // return result.rows[0];
};

const checkIfPhoneExist = async (data) => {
  const sql = 'SELECT from usersx WHERE phone = $1';
  const bindingParameter = [data];
  const client = await db.connect();
  const result = await client.query(sql, bindingParameter);
  client.release();
  if (result.rowCount > 0) {
    throw new Error('phone number already exist');
  }
  return 'passed';
};

const assignMail = ({
  epicMail,
  password,
  phone,
  firstName,
  lastName,
}) => {
  const user = {
    epicmail: `${epicMail}@epicmail.com`,
    firstname: firstName,
    lastname: lastName,
    password,
    phone,
  };
  return user;
};

export default {
  userCheck,
  assignMail,
  checkIfEmailExist,
  checkIfPhoneExist,
  checkIfLoginEmailExist,
};
