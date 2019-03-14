import messageData from '../utils/dummyMessageData';
import userData from '../utils/dummyUserData';
import Messages from '../models/message.model';

const messageService = {
  getUserEmails(epicMail) {
    const userEmail = messageData.message
      .filter(mail => mail.receiverEmail === epicMail);
    return userEmail;
  },
  getUnreadEmails(epicMail) {
    const userEmail = messageData.message
      .filter(mail => mail.receiverEmail === epicMail && mail.status === 'unread');
    return userEmail;
  },
  getSentEmails(epicMail) {
    const userEmail = messageData.message
      .filter(mail => mail.senderEmail === epicMail);
    return userEmail;
  },
  getSingleEmail(epicMail, id) {
    const userEmail = messageData.message
      .filter(mail => mail.receiverEmail === epicMail || mail.senderEmail === epicMail);
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
      receiverEmail,
    } = sentData;
    const lastMessageId = messageData.message.length - 1;
    const currentMessageId = messageData.message[lastMessageId].id;
    const newMessageId = currentMessageId + 1;

    const findReceiver = userData.user.find(user => user.epicMail === receiverEmail);
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
  },

  deleteSingleEmail(epicMail, id) {
    const userEmail = messageData.message
      .find(mail => mail.senderEmail === epicMail && mail.id === id);
    if (userEmail) {
      const emailIndex = messageData.message.indexOf(userEmail);
      const delMail = messageData.message.splice(emailIndex, 1);
      return delMail;
    }
    return false;
  },
};

export default messageService;
