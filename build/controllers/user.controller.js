"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../services/user.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const secret = process.env.SECRET;

class UserController {
  static async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password
      } = req.body;
      const hashPassword = await _bcrypt.default.hash(password, 10);
      const user = {
        firstName,
        lastName,
        email,
        hashPassword
      };
      const createdUser = await _user.default.createUser(user);

      if (!createdUser) {
        throw new Error('first name and last name already exits');
      }

      const userDetails = {
        epicMail: createdUser.epicMail,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        createdAt: createdUser.createdAt
      };
      const safeUser = {
        password: createdUser.password,
        epicMail: createdUser.epicMail
      };

      const jwtToken = _jsonwebtoken.default.sign({
        user: safeUser
      }, secret, {
        expiresIn: 86400
      });

      return res.status(201).json({
        status: 'success',
        data: [{
          token: jwtToken,
          epicMail: userDetails
        }]
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const {
        epicMail,
        password
      } = req.body;
      const user = await _user.default.checkUser(epicMail);

      if (!user) {
        throw new Error('User with that email does not exist');
      }

      const result = await _bcrypt.default.compare(password, user.password);

      if (!result) {
        throw new Error("User details don't match our records");
      }

      const safeUser = {
        epicMail: user.epicMail
      };

      const jwtToken = _jsonwebtoken.default.sign({
        user: safeUser
      }, secret, {
        expiresIn: 86400
      });

      return res.status(200).json({
        status: 'success',
        token: jwtToken
      });
    } catch (error) {
      return res.status(409).json({
        status: 'error',
        message: error.message
      });
    }
  }

}

var _default = UserController;
exports.default = _default;
//# sourceMappingURL=user.controller.js.map