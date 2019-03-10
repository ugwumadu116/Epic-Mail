import messageService from '../services/message.services';

class MessageController {
  static async getEmail(req, res) {
    try {
      const userMails = await messageService
        .getUserEmails(req.userData.user.epicMail);
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
      const userMails = await messageService
        .getUnreadEmails(req.userData.user.epicMail);
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
      const userMails = await messageService
        .getSentEmails(req.userData.user.epicMail);
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
      const userMails = await messageService
        .getSingleEmail(req.userData.user.epicMail, messageId);
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

  static async PostAnEmail(req, res) {
    try {
      const messageDetails = req.body;
      const userMails = await messageService
        .postEmail(req.userData.user.epicMail, messageDetails);
      return res.status(201).json({
        status: 201,
        message: userMails,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  static async deleteAnEmail(req, res) {
    try {
      const { id } = req.params;
      const messageId = parseInt(id, 10);
      const userMails = await messageService
        .deleteSingleEmail(req.userData.user.epicMail, messageId);
      if (userMails) {
        return res.status(200).json({
          status: 200,
          message: 'Deleted successfully',
        });
      }
      throw new Error('No mesage found');
    } catch (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  }
}
export default MessageController;
