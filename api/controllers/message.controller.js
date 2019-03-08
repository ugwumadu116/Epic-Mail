import messageService from '../services/message.services';

class MessageController {
  static async getEmail(req, res) {
    try {
      const userMails = await messageService.getUserEmails(req.userData.user.epicMail);
      if (userMails.length === 0) {
        throw new Error('Your mail is empty');
      }
      return res.status(200).json({
        status: 200,
        message: userMails,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}
export default MessageController;
