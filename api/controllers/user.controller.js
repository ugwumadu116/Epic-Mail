import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../connection';

dotenv.config();
const secret = process.env.SECRET;

class UserController {
  static async registerUser(req, res) {
    try {
      const d = new Date();
      const {
        epicMail,
        firstName,
        lastName,
        hashPassword,
      } = req.userData;
      const safeUser = {
        epicMail,
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 43200,
      });
      const sql = 'INSERT INTO users (firstname, lastname, epicmail, password, createdat, updatedat) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const bindingParameter = [firstName, lastName, epicMail, hashPassword, d, d];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      client.release();
      const userDetails = {
        firstName: insertedResult.rows[0].firstname,
        lastName: insertedResult.rows[0].lastname,
        epicMail: insertedResult.rows[0].epicmail,
        createdAt: insertedResult.rows[0].createdat,
        updatedAt: insertedResult.rows[0].updatedat,
      };
      return res.status(201).json({
        status: 201,
        data: [{
          user: userDetails,
          token: jwtToken,
        }],
      });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        message: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const userDetails = {
        id: req.userDetails[0].id,
        epicMail: req.userDetails[0].epicmail,
        firstName: req.userDetails[0].firstname,
        lastName: req.userDetails[0].lastname,
        createdAt: req.userDetails[0].createdat,
        isadmin: req.userDetails[0].isadmin,
      };

      const result = await bcrypt.compare(req.body.password, req.userDetails[0].password);
      if (!result) {
        throw new Error('Epicmail or password is wrong');
      }
      const safeUser = {
        epicMail: userDetails.epicMail,
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 43200,
      });
      return res.status(200).json({
        status: 200,
        token: jwtToken,
        userDetails,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }
}
export default UserController;
