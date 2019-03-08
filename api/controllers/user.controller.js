import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userService from '../services/user.services';

dotenv.config();
const secret = process.env.SECRET;

class UserController {
  static async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const hashPasword = await bcrypt.hash(password, 10);
      const user = {
        firstName,
        lastName,
        email,
        hashPasword,
      };
      const createdUser = await userService.createUser(user);
      if (!createdUser) {
        throw new Error('first name and last name already exits');
      }
      if (createdUser) {
        const safeUser = {
          password: createdUser.password,
          epicMail: createdUser.epicMail,
        };
        const jwtToken = jwt.sign({ user: safeUser }, secret, {
          expiresIn: 86400,
        });
        return res.status(201).json({
          status: 'success',
          data: [{
            token: jwtToken,
            epicmail: safeUser,
          }],
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const {
        epicMail,
        password,
      } = req.body;
      const user = await userService.checkUser(epicMail);
      if (!user) {
        throw new Error('User with that email does not exist');
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error("Password doesn't match our records");
      }
      const safeUser = {
        password: user.password,
        epicMail: user.epicMail,
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        status: 'success',
        token: jwtToken,
      });
    } catch (error) {
      return res.status(409).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
export default UserController;
