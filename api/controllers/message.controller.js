import messageService from '../services/message.services';

class MessageController {
  static async getEmail(req, res) {
    try {
      const userMails = await messageService.getUserEmails(req.userData.user.epicMail);
      if (userMails.length === 0) {
        throw new Error('No mail found');
      }
      return res.status(200).json({
        status: 200,
        message: userMails,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getUnreadEmail(req, res) {
    try {
      const userMails = await messageService.getUnreadEmails(req.userData.user.epicMail);
      if (userMails.length === 0) {
        throw new Error('No unread mail found');
      }
      return res.status(200).json({
        status: 200,
        message: userMails,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getSentEmail(req, res) {
    try {
      const userMails = await messageService.getSentEmails(req.userData.user.epicMail);
      if (userMails.length === 0) {
        throw new Error('No sent mail found');
      }
      return res.status(200).json({
        status: 200,
        message: userMails,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }

  static async getAnEmail(req, res) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id, 10);
      const userMails = await messageService.getSingleEmail(req.userData.user.epicMail, messageId);
      if (!userMails) {
        throw new Error('No mesage found');
      }
      return res.status(200).json({
        status: 200,
        message: userMails,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }
}
export default MessageController;
