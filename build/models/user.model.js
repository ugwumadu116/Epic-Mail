"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class User {
  constructor() {
    this.id = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.password = null;
    this.epicMail = `${this.firstName}${this.lastName}@epicmail.com`;
  }

}

var _default = User;
exports.default = _default;
//# sourceMappingURL=user.model.js.map