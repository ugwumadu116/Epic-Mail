"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(require("../services/message.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "getEmail",
    value: function () {
      var _getEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userMails;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _message.default.getUserEmails(req.userData.user.epicMail);

              case 3:
                userMails = _context.sent;

                if (!(userMails.length === 0)) {
                  _context.next = 6;
                  break;
                }

                throw new Error('No mail found');

              case 6:
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: userMails
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(404).json({
                  status: 404,
                  message: _context.t0.message
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function getEmail(_x, _x2) {
        return _getEmail.apply(this, arguments);
      }

      return getEmail;
    }()
  }, {
    key: "getUnreadEmail",
    value: function () {
      var _getUnreadEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var userMails;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _message.default.getUnreadEmails(req.userData.user.epicMail);

              case 3:
                userMails = _context2.sent;

                if (!(userMails.length === 0)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('No unread mail found');

              case 6:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: userMails
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  message: _context2.t0.message
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function getUnreadEmail(_x3, _x4) {
        return _getUnreadEmail.apply(this, arguments);
      }

      return getUnreadEmail;
    }()
  }, {
    key: "getSentEmail",
    value: function () {
      var _getSentEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var userMails;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _message.default.getSentEmails(req.userData.user.epicMail);

              case 3:
                userMails = _context3.sent;

                if (!(userMails.length === 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new Error('No sent mail found');

              case 6:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: userMails
                }));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  message: _context3.t0.message
                }));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function getSentEmail(_x5, _x6) {
        return _getSentEmail.apply(this, arguments);
      }

      return getSentEmail;
    }()
  }, {
    key: "getAnEmail",
    value: function () {
      var _getAnEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, messageId, userMails;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                messageId = parseInt(id, 10);
                _context4.next = 5;
                return _message.default.getSingleEmail(req.userData.user.epicMail, messageId);

              case 5:
                userMails = _context4.sent;

                if (userMails) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('No mesage found');

              case 8:
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  message: userMails
                }));

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  message: _context4.t0.message
                }));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      function getAnEmail(_x7, _x8) {
        return _getAnEmail.apply(this, arguments);
      }

      return getAnEmail;
    }()
  }, {
    key: "PostAnEmail",
    value: function () {
      var _PostAnEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var messageDetails, userMails;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                messageDetails = req.body;
                _context5.next = 4;
                return _message.default.postEmail(req.userData.user.epicMail, messageDetails);

              case 4:
                userMails = _context5.sent;

                if (userMails) {
                  _context5.next = 7;
                  break;
                }

                throw new Error('Mail not sent');

              case 7:
                return _context5.abrupt("return", res.status(201).json({
                  status: 201,
                  message: userMails
                }));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  status: 400,
                  message: _context5.t0.message
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      function PostAnEmail(_x9, _x10) {
        return _PostAnEmail.apply(this, arguments);
      }

      return PostAnEmail;
    }()
  }, {
    key: "deleteAnEmail",
    value: function () {
      var _deleteAnEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var id, messageId, userMails;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                id = req.params.id;
                messageId = parseInt(id, 10);
                _context6.next = 5;
                return _message.default.deleteSingleEmail(req.userData.user.epicMail, messageId);

              case 5:
                userMails = _context6.sent;

                if (userMails) {
                  _context6.next = 8;
                  break;
                }

                throw new Error('No mesage found');

              case 8:
                return _context6.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Deleted successfully'
                }));

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", res.status(404).json({
                  status: 404,
                  message: _context6.t0.message
                }));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 11]]);
      }));

      function deleteAnEmail(_x11, _x12) {
        return _deleteAnEmail.apply(this, arguments);
      }

      return deleteAnEmail;
    }()
  }]);

  return MessageController;
}();

var _default = MessageController;
exports.default = _default;
//# sourceMappingURL=message.controller.js.map