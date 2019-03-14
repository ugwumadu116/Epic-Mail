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
      const hashPassword = await bcrypt.hash(password, 10);
      const user = {
        firstName,
        lastName,
        email,
        hashPassword,
      };
      const createdUser = await userService.createUser(user);
      if (!createdUser) {
        throw new Error('first name and last name already exits');
      }
      const userDetails = {
        epicMail: createdUser.epicMail,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        createdAt: createdUser.createdAt,
      };
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
          epicMail: userDetails,
        }],
      });
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
        throw new Error("User details don't match our records");
      }
      const safeUser = {
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
