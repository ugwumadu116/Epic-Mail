import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userService from '../services/user.services';

dotenv.config();
const secret = process.env.SECRET;

class UserController {
  static registerUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    const hashPasword = bcrypt.hash(password, 10);
    const user = {
      firstName,
      lastName,
      email,
      hashPasword,
    };
    const createdUser = userService.createUser(user);
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
          epicmail: safeUser.epicMail,
        }],
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'first name and last name already exits',
    });
  }
}
export default UserController;
