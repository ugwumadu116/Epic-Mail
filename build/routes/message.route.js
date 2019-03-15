"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _trimRequest = _interopRequireDefault(require("trim-request"));

var _userAuth = _interopRequireDefault(require("../middleware/userAuth"));

var _message = _interopRequireDefault(require("../controllers/message.controller"));

var _userValidator = _interopRequireDefault(require("../middleware/userValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', _userAuth.default.validate, _message.default.getEmail);
router.get('/unread', _userAuth.default.validate, _message.default.getUnreadEmail);
router.get('/sent', _userAuth.default.validate, _message.default.getSentEmail);
router.get('/:id', _userAuth.default.validate, _message.default.getAnEmail);
router.post('/', _trimRequest.default.body, _userValidator.default.validatePostMail, _userAuth.default.validate, _message.default.PostAnEmail);
router.delete('/:id', _userAuth.default.validate, _message.default.deleteAnEmail);
var _default = router;
exports.default = _default;
//# sourceMappingURL=message.route.js.map