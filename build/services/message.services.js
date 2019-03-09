"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyMessageData = _interopRequireDefault(require("../utils/dummyMessageData"));

var _message = _interopRequireDefault(require("../models/message.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageService = {
  getUserEmails(epicMail) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.recieverId === epicMail);

    return userEmail;
  },

  getUnreadEmails(epicMail) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.recieverId === epicMail && mail.status === 'sent');

    return userEmail;
  },

  getSentEmails(epicMail) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.senderId === epicMail);

    return userEmail;
  },

  getSingleEmail(epicMail, id) {
    const userEmail = _dummyMessageData.default.message.find(mail => mail.recieverId === epicMail && mail.id === id);

    return userEmail;
  },

  postEmail(epicMail, sentData) {
    const {
      subject,
      message,
      recieverId
    } = sentData;
    const lastMessageId = _dummyMessageData.default.message.length - 1;
    const currentMessageId = _dummyMessageData.default.message[lastMessageId].id;
    const newMessageId = currentMessageId + 1;
    const date = new Date();
    const today = date.toLocaleString('en-us', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    const newMesage = new _message.default();
    newMesage.id = newMessageId;
    newMesage.createdOn = today;
    newMesage.subject = subject;
    newMesage.message = message;
    newMesage.senderId = epicMail;
    newMesage.recieverId = recieverId;
    newMesage.parentMessageId = lastMessageId + 1;
    newMesage.status = 'sent';

    _dummyMessageData.default.message.push(newMesage);

    return newMesage;
  },

  deleteSingleEmail(epicMail, id) {
    const userEmail = _dummyMessageData.default.message.find(mail => mail.recieverId === epicMail && mail.id === id);

    const emailIndex = _dummyMessageData.default.message.indexOf(userEmail);

    const delMail = _dummyMessageData.default.message.splice(emailIndex, 1);

    return delMail;
  }

};
var _default = messageService;
exports.default = _default;
//# sourceMappingURL=message.services.js.map