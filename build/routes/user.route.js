"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/auth/signup', _user.default.registerUser);
router.post('/auth/login', _user.default.loginUser);
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.route.js.map