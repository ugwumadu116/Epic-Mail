import messageData from '../utils/dummyMessageData';
import userData from '../utils/dummyUserData';
import Messages from '../models/message.model';

class MessageService {
  static async getUserEmails(epicMail) {
    try {
      const userEmail = await messageData.message
        .filter(mail => mail.receiverEmail === epicMail);
      return userEmail;
    } catch (error) {
      return error;
    }
  }

  static async getUnreadEmails(epicMail) {
    try {
      const userEmail = await messageData.message
        .filter(mail => mail.receiverEmail === epicMail && mail.status === 'unread');
      return userEmail;
    } catch (error) {
      return error;
    }
  }

  static async getSentEmails(epicMail) {
    try {
      const userEmail = await messageData.message
        .filter(mail => mail.senderEmail === epicMail);
      return userEmail;
    } catch (error) {
      return error;
    }
  }

  static async getSingleEmail(epicMail, id) {
    try {
      const userEmail = await messageData.message
        .filter(mail => mail.receiverEmail === epicMail || mail.senderEmail === epicMail);
      const foundEmail = await userEmail.find(mail => mail.id === id);
      if (foundEmail) {
        return foundEmail;
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  static async deleteSingleEmail(epicMail, id) {
    const userEmail = await messageData.message
      .find(mail => mail.senderEmail === epicMail && mail.id === id);
    if (userEmail) {
      const emailIndex = await messageData.message.indexOf(userEmail);
      const delMail = messageData.message.splice(emailIndex, 1);
      return delMail;
    }
    return false;
  }

  static async postEmail(epicMail, sentData) {
    try {
      const {
        subject,
        message,
        receiverEmail,
      } = sentData;
      const lastMessageId = messageData.message.length - 1;
      const currentMessageId = messageData.message[lastMessageId].id;
      const newMessageId = currentMessageId + 1;
      const findReceiver = await userData.user.find(user => user.epicMail === receiverEmail);
      if (findReceiver) {
        const newMessage = new Messages();
        newMessage.id = newMessageId;
        newMessage.createdOn = new Date();
        newMessage.subject = subject;
        newMessage.message = message;
        newMessage.senderEmail = epicMail;
        newMessage.receiverEmail = receiverEmail;
        newMessage.parentMessageId = 0;
        newMessage.status = 'unread';
        messageData.message.push(newMessage);
        return newMessage;
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}

export default MessageService;
