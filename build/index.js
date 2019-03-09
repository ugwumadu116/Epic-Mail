"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _message = _interopRequireDefault(require("./routes/message.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

_dotenv.default.config();

app.use(_bodyParser.default.json());
app.use((0, _cors.default)());
var PORT = process.env.PORT || 3001;
var prefix = '/api/v1';
app.get('/', function (req, res) {
  res.send('welcome to Epic-Mail Api');
});
app.use("".concat(prefix, "/"), _user.default);
app.use("".concat(prefix, "/messages"), _message.default);
app.listen(PORT, function () {
  return console.log("Welcome ".concat(PORT));
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map