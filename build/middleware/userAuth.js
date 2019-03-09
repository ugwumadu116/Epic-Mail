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
        res.status(401).send('Access denied.No token provided');
      }

      const deceoded = await _jsonwebtoken.default.verify(token, process.env.SECRET);

      if (deceoded) {
        req.userData = deceoded;
        next();
      }
    } catch (error) {
      res.status(400).json({
        message: 'Unauthorised invalid token'
      });
    }
  }

}

var _default = checkAuth;
exports.default = _default;
//# sourceMappingURL=userAuth.js.map