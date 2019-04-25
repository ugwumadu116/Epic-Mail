import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import creatMail from '../helpers/userValidator';
import db from '../config/db';
// import logger from '../config/logging';

dotenv.config();
const secret = process.env.SECRET;

const generateToken = user => jwt.sign({ user },
  secret, { expiresIn: '1h' });
class UserController {
  static async registerUser(req, res) {
    try {
      const user = await creatMail.assignMail(req.body);
      const {
        epicmail,
        firstname,
        lastname,
        password,
        phone,
      } = user;
      await creatMail.checkIfEmailExist(epicmail);
      await creatMail.checkIfPhoneExist(phone);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const sql = 'INSERT INTO usersx (firstname, lastname, epicmail, password, phone) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const bindParameters = [firstname, lastname, epicmail, hash, phone];
      const client = await db.connect();
      const result = await client.query(sql, bindParameters);
      client.release();
      const token = generateToken(result.rows[0].id);
      const newUser = {
        id: result.rows[0].id,
        firstName: result.rows[0].firstname,
        lastName: result.rows[0].lastname,
        epicmail: result.rows[0].epicmail,
        phone: result.rows[0].phone,
        createdOn: result.rows[0].createdon,
        isAdmin: result.rows[0].isadmin,
      };
      return res.status(201).json({
        status: 'success',
        data: [{
          user: newUser,
          token,
        }],
      });
    } catch (error) {
      if (error.message === 'email already exists' || error.message === 'phone number already exist') {
        return res.status(409).json({
          status: 409,
          message: error.message,
        });
      }
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const user = await creatMail.checkIfLoginEmailExist(req.body.epicMail);
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        throw new Error('invalid password or username');
      }
      const newUser = {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        epicmail: user.epicmail,
        phone: user.phone,
        createdOn: user.createdon,
        isAdmin: user.isadmin,
      };
      const token = generateToken(user.id);
      return res.status(200).json({
        test: 'logged in',
        user: newUser,
        token,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }
}
export default UserController;
