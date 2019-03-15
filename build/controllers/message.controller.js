"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(require("../services/message.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessageController {
  static async getEmail(req, res) {
    try {
      const userMails = await _message.default.getUserEmails(req.userData.user.epicMail);

      if (userMails.length === 0) {
        throw new Error('No mail found');
      }

      return res.status(200).json({
        status: 200,
        message: userMails
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message
      });
    }
  }

  static async getUnreadEmail(req, res) {
    try {
      const userMails = await _message.default.getUnreadEmails(req.userData.user.epicMail);

      if (userMails.length === 0) {
        throw new Error('No unread mail found');
      }

      return res.status(200).json({
        status: 200,
        message: userMails
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message
      });
    }
  }

  static async getSentEmail(req, res) {
    try {
      const userMails = await _message.default.getSentEmails(req.userData.user.epicMail);

      if (userMails.length === 0) {
        throw new Error('No sent mail found');
      }

      return res.status(200).json({
        status: 200,
        message: userMails
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message
      });
    }
  }

  static async getAnEmail(req, res) {
    try {
      const {
        id
      } = req.params;
      const messageId = parseInt(id, 10);
      const userMails = await _message.default.getSingleEmail(req.userData.user.epicMail, messageId);

      if (!userMails) {
        throw new Error('No message found');
      }

      return res.status(200).json({
        status: 200,
        message: userMails
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message
      });
    }
  }

  static async PostAnEmail(req, res) {
    try {
      const messageDetails = req.body;
      const userMails = await _message.default.postEmail(req.userData.user.epicMail, messageDetails);

      if (userMails) {
        return res.status(201).json({
          status: 201,
          data: userMails
        });
      }

      throw new Error('receiverEmail dont exits');
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message
      });
    }
  }

  static async deleteAnEmail(req, res) {
    try {
      const {
        id
      } = req.params;
      const messageId = parseInt(id, 10);
      const userMails = await _message.default.deleteSingleEmail(req.userData.user.epicMail, messageId);

      if (userMails) {
        return res.status(200).json({
          status: 200,
          message: 'Deleted successfully'
        });
      }

      throw new Error('No message found');
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message
      });
    }
  }

}

var _default = MessageController;
exports.default = _default;
//# sourceMappingURL=message.controller.js.map