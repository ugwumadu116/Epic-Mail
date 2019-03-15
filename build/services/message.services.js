"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyMessageData = _interopRequireDefault(require("../utils/dummyMessageData"));

var _dummyUserData = _interopRequireDefault(require("../utils/dummyUserData"));

var _message = _interopRequireDefault(require("../models/message.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageService = {
  getUserEmails(epicMail) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.receiverEmail === epicMail);

    return userEmail;
  },

  getUnreadEmails(epicMail) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.receiverEmail === epicMail && mail.status === 'unread');

    return userEmail;
  },

  getSentEmails(epicMail) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.senderEmail === epicMail);

    return userEmail;
  },

  getSingleEmail(epicMail, id) {
    const userEmail = _dummyMessageData.default.message.filter(mail => mail.receiverEmail === epicMail || mail.senderEmail === epicMail);

    const foundEmail = userEmail.find(mail => mail.id === id);

    if (foundEmail) {
      return foundEmail;
    }

    return false;
  },

  postEmail(epicMail, sentData) {
    const {
      subject,
      message,
      receiverEmail
    } = sentData;
    const lastMessageId = _dummyMessageData.default.message.length - 1;
    const currentMessageId = _dummyMessageData.default.message[lastMessageId].id;
    const newMessageId = currentMessageId + 1;

    const findReceiver = _dummyUserData.default.user.find(user => user.epicMail === receiverEmail);

    if (findReceiver) {
      const newMessage = new _message.default();
      newMessage.id = newMessageId;
      newMessage.createdOn = new Date();
      newMessage.subject = subject;
      newMessage.message = message;
      newMessage.senderEmail = epicMail;
      newMessage.receiverEmail = receiverEmail;
      newMessage.parentMessageId = 0;
      newMessage.status = 'unread';

      _dummyMessageData.default.message.push(newMessage);

      return newMessage;
    }

    return false;
  },

  deleteSingleEmail(epicMail, id) {
    const userEmail = _dummyMessageData.default.message.find(mail => mail.senderEmail === epicMail && mail.id === id);

    if (userEmail) {
      const emailIndex = _dummyMessageData.default.message.indexOf(userEmail);

      const delMail = _dummyMessageData.default.message.splice(emailIndex, 1);

      return delMail;
    }

    return false;
  }

};
var _default = messageService;
exports.default = _default;
//# sourceMappingURL=message.services.js.map