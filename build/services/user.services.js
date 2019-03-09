"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _dummyUserData = _interopRequireDefault(require("../utils/dummyUserData"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const epic = '@epicmail.com';
const userService = {
  createUser(user) {
    const {
      email,
      firstName,
      lastName,
      hashPasword
    } = user;
    const userEpicMail = `${firstName}${lastName}${epic}`;
    const findUser = this.checkUser(userEpicMail);

    if (findUser) {
      return false;
    }

    const newUser = new _user.default();
    newUser.id = _uuid.default.v4();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hashPasword;
    newUser.epicMail = userEpicMail;

    _dummyUserData.default.user.push(newUser);

    return newUser;
  },

  checkUser(epicMail) {
    const userExist = _dummyUserData.default.user.find(user => user.epicMail === epicMail);

    return userExist;
  }

};
var _default = userService;
exports.default = _default;
//# sourceMappingURL=user.services.js.map