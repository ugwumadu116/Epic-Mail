"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

<<<<<<< HEAD
var _swagger = _interopRequireDefault(require("./swagger.json"));
=======
var _swagger = _interopRequireDefault(require("../swagger.json"));
>>>>>>> 3d6933f5e7a20cc3088a3e8892fc150a49f318a8

var _user = _interopRequireDefault(require("./routes/user.route"));

var _message = _interopRequireDefault(require("./routes/message.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_dotenv.default.config();

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
const PORT = process.env.PORT || 3001;
const prefix = '/api/v1';
app.get('/', (req, res) => {
  res.status(200).send('welcome to Epic-Mail Api');
});
app.use(`${prefix}/`, _user.default);
app.use(`${prefix}/messages`, _message.default);
app.listen(PORT, () => console.log(`Welcome ${PORT}`));
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map