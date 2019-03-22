import bcrypt from 'bcrypt';
import db from '../connection';

const epic = '@epicmail.com';

class CheckMiddleware {
  static async checkIfEmailAlreadyExist(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const newEmail = email.split('@')[0];
      const userEpicMail = `${newEmail}${epic}`;
      const user = {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        epicMail: userEpicMail.toLowerCase(),
        hashPassword,
      };
      const sql = 'SELECT * FROM users WHERE epicmail = $1';
      const bindingParameter = [user.epicMail];
      const client = await db.connect();
      const resultOfEmailAvailabilityCheck = await client.query(sql, bindingParameter);
      client.release();
      if (resultOfEmailAvailabilityCheck.rowCount > 0) {
        return res.status(400).json({ error: 'User with the same email already exist' });
      }
      req.userData = user;
      next();
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: String(err.details[0].message),
        type: 'validation',
      });
    }
  }

  static async checkLoginEmail(req, res, next) {
    try {
      const sql = 'SELECT * FROM users WHERE epicmail = $1';
      const bindingParameter = [req.body.epicMail];
      const client = await db.connect();
      const emailCheck = await client.query(sql, bindingParameter);
      client.release();
      if (emailCheck.rowCount === 0) {
        return res.status(400).json({ error: 'Epicmail or password is wrong' });
      }
      req.userDetails = emailCheck.rows;
      next();
      return true;
    } catch (err) {
      return res.status(400).json({
        status: '400',
        message: String(err.details[0].message),
        type: 'validation',
      });
    }
  }

  static async getUserId(req, res, next) {
    try {
      const sql = 'SELECT * FROM users WHERE epicmail = $1';
      const bindingParameter = [req.userData.user.epicMail];
      const client = await db.connect();
      const emailCheck = await client.query(sql, bindingParameter);
      client.release();
      req.userID = emailCheck.rows[0].id;
      next();
    } catch (err) {
      return res.status(400).json({
        status: '400',
        message: String(err.details[0].message),
        type: 'validation',
      });
    }
  }

  static async checkIfMessageExist(req, res, next) {
    try {
      const { id } = req.params;
      const sql = 'SELECT * from inbox WHERE messageid = $1';
      const bindingParameter = [id];
      const client = await db.connect();
      const insertedResult = await client.query(sql, bindingParameter);
      if (insertedResult.rowCount === 0) {
        return res.status(404).json({ status: 404, message: 'Message not found' });
      }
      if (insertedResult.rowCount > 0) {
        const sql2 = 'UPDATE inbox SET status = $1 WHERE messageid = $2';
        const bindingParameter2 = ['read', id];
        await client.query(sql2, bindingParameter2);
      }
      client.release();
      next();
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: 'Invalid request Id',
      });
    }
  }

  static async paramIdValid(req, res, next) {
    try {
      const requestId = parseInt(req.params.id, 10);
      if (!Number.isInteger(requestId) || requestId > 1000000000) {
        return res.status(400).json({ message: 'Invalid request Id parameter' });
      }
      next();
    } catch (err) {
      res.status(403).json('Forbidden');
    }
  }

  static async checkIfReceiverEmailExist(req, res, next) {
    try {
      const receiverEmail = req.body.receiverEmail.toLowerCase();
      const sql = 'SELECT * FROM users WHERE epicmail = $1';
      const bindingParameter = [receiverEmail];
      const client = await db.connect();
      const resultOfReceiverEmail = await client.query(sql, bindingParameter);
      if (resultOfReceiverEmail.rowCount > 0) {
        const sql2 = 'SELECT * FROM users WHERE epicmail = $1';
        const bindingParameter2 = [req.userData.user.epicMail];
        const myInfo = await client.query(sql2, bindingParameter2);
        req.myInfos = myInfo.rows;
        req.receiverInfos = resultOfReceiverEmail.rows;
        next();
      }
      client.release();
      if (resultOfReceiverEmail.rowCount === 0) {
        return res.status(400).json({ status: 400, error: 'Receiver Epic-Mail don\'t exist in our system' });
      }
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: String(err.details[0].message),
        type: 'validation',
      });
    }
  }
}

export default CheckMiddleware;
