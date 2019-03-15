"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Message {
  constructor() {
    this.id = null;
    this.createdOn = null;
    this.subject = null;
    this.message = null;
    this.senderEmail = null;
    this.receiverEmail = null;
    this.parentMessageId = null;
    this.status = 'sent' || 'draft' || 'read';
  }

}

var _default = Message;
exports.default = _default;
//# sourceMappingURL=message.model.js.map