"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyMessageData = _interopRequireDefault(require("../utils/dummyMessageData"));

var _message = _interopRequireDefault(require("../models/message.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageService = {
  getUserEmails: function getUserEmails(epicMail) {
    var userEmail = _dummyMessageData.default.message.filter(function (mail) {
      return mail.recieverId === epicMail;
    });

    return userEmail;
  },
  getUnreadEmails: function getUnreadEmails(epicMail) {
    var userEmail = _dummyMessageData.default.message.filter(function (mail) {
      return mail.recieverId === epicMail && mail.status === 'sent';
    });

    return userEmail;
  },
  getSentEmails: function getSentEmails(epicMail) {
    var userEmail = _dummyMessageData.default.message.filter(function (mail) {
      return mail.senderId === epicMail;
    });

    return userEmail;
  },
  getSingleEmail: function getSingleEmail(epicMail, id) {
    var userEmail = _dummyMessageData.default.message.find(function (mail) {
      return mail.recieverId === epicMail && mail.id === id;
    });

    return userEmail;
  },
  postEmail: function postEmail(epicMail, sentData) {
    var subject = sentData.subject,
        message = sentData.message,
        recieverId = sentData.recieverId;
    var lastMessageId = _dummyMessageData.default.message.length - 1;
    var currentMessageId = _dummyMessageData.default.message[lastMessageId].id;
    var newMessageId = currentMessageId + 1;
    var date = new Date();
    var today = date.toLocaleString('en-us', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    var newMesage = new _message.default();
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
  deleteSingleEmail: function deleteSingleEmail(epicMail, id) {
    var userEmail = _dummyMessageData.default.message.find(function (mail) {
      return mail.recieverId === epicMail && mail.id === id;
    });

    var emailIndex = _dummyMessageData.default.message.indexOf(userEmail);

    var delMail = _dummyMessageData.default.message.splice(emailIndex, 1);

    return delMail;
  }
};
var _default = messageService;
exports.default = _default;
//# sourceMappingURL=message.services.js.map