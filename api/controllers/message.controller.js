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
}
export default MessageController;
