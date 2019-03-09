"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _dummyUserData = _interopRequireDefault(require("../utils/dummyUserData"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epic = '@epicmail.com';
var userService = {
  createUser: function createUser(user) {
    var email = user.email,
        firstName = user.firstName,
        lastName = user.lastName,
        hashPasword = user.hashPasword;
    var userEpicMail = "".concat(firstName).concat(lastName).concat(epic);
    var findUser = this.checkUser(userEpicMail);

    if (findUser) {
      return false;
    }

    var newUser = new _user.default();
    newUser.id = _uuid.default.v4();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hashPasword;
    newUser.epicMail = userEpicMail;

    _dummyUserData.default.user.push(newUser);

    return newUser;
  },
  checkUser: function checkUser(epicMail) {
    var userExist = _dummyUserData.default.user.find(function (user) {
      return user.epicMail === epicMail;
    });

    return userExist;
  }
};
var _default = userService;
exports.default = _default;
//# sourceMappingURL=user.services.js.map