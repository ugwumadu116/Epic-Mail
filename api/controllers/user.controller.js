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
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        hashPassword,
      };
      const createdUser = await userService.createUser(user);
      if (Object.keys(createdUser).length === 0) {
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
        expiresIn: 43200,
      });
      return res.status(201).json({
        status: 'success',
        data: [{
          token: jwtToken,
          user: userDetails,
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
      const {
        password,
      } = req.body;
      const epicMail = req.body.epicMail.toLowerCase();
      const user = await userService.checkUser(epicMail);
      if (!user) {
        throw new Error("User details don't match our records");
      }
      const userDetails = {
        epicMail: user.epicMail,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      };
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error("User details don't match our records");
      }
      const safeUser = {
        epicMail: user.epicMail,
      };
      const jwtToken = jwt.sign({ user: safeUser }, secret, {
        expiresIn: 43200,
      });
      return res.status(200).json({
        status: 'success',
        token: jwtToken,
        userDetails,
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
