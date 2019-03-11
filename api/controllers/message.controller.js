import messageService from '../services/message.services';

class MessageController {
  static getEmail(req, res) {
    const userMails = messageService
      .getUserEmails(req.userData.user.epicMail);
    if (userMails.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No mail found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: userMails,
    });
  }

  static getUnreadEmail(req, res) {
    const userMails = messageService
      .getUnreadEmails(req.userData.user.epicMail);
    if (userMails.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No unread mail found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: userMails,
    });
  }

  static getSentEmail(req, res) {
    const userMails = messageService
      .getSentEmails(req.userData.user.epicMail);
    if (userMails.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No sent mail found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: userMails,
    });
  }

  static getAnEmail(req, res) {
    const { id } = req.params;
    const messageId = parseInt(id, 10);
    const userMails = messageService
      .getSingleEmail(req.userData.user.epicMail, messageId);
    if (!userMails) {
      return res.status(404).json({
        status: 404,
        message: 'No message found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: userMails,
    });
  }

  static PostAnEmail(req, res) {
    const messageDetails = req.body;
    const userMails = messageService
      .postEmail(req.userData.user.epicMail, messageDetails);
    return res.status(201).json({
      status: 201,
      message: userMails,
    });
  }

  static deleteAnEmail(req, res) {
    const { id } = req.params;
    const messageId = parseInt(id, 10);
    messageService
      .deleteSingleEmail(req.userData.user.epicMail, messageId);
    return res.status(200).json({
      status: 200,
      message: 'Deleted successfully',
    });
  }
}
export default MessageController;
