"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

class checkAuth {
  static async validate(req, res, next) {
    try {
      const token = req.headers['x-auth-token'];

      if (!token) {
        res.status(401).json({
          message: 'Access denied.No token provided'
        });
      }

      const decoded = await _jsonwebtoken.default.verify(token, process.env.SECRET);

      if (decoded) {
        req.userData = decoded;
        next();
      }
    } catch (err) {
      res.status(400).json({
        message: 'Unauthorized invalid token'
      });
    }
  }

}

var _default = checkAuth;
exports.default = _default;
//# sourceMappingURL=userAuth.js.map