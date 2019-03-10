import messageData from '../utils/dummyMessageData';
import Messages from '../models/message.model';

const messageService = {
  getUserEmails(epicMail) {
    const userEmail = messageData.message
      .filter(mail => mail.recieverId === epicMail);
    return userEmail;
  },
  getUnreadEmails(epicMail) {
    const userEmail = messageData.message
      .filter(mail => mail.recieverId === epicMail && mail.status === 'sent');
    return userEmail;
  },
  getSentEmails(epicMail) {
    const userEmail = messageData.message
      .filter(mail => mail.senderId === epicMail);
    return userEmail;
  },
  getSingleEmail(epicMail, id) {
    const userEmail = messageData.message
      .find(mail => mail.recieverId === epicMail && mail.id === id);
    return userEmail;
  },
  postEmail(epicMail, sentData) {
    const {
      subject,
      message,
      recieverId,
    } = sentData;
    const lastMessageId = messageData.message.length - 1;
    const currentMessageId = messageData.message[lastMessageId].id;
    const newMessageId = currentMessageId + 1;

    const date = new Date();
    const today = date.toLocaleString('en-us', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const newMesage = new Messages();
    newMesage.id = newMessageId;
    newMesage.createdOn = today;
    newMesage.subject = subject;
    newMesage.message = message;
    newMesage.senderId = epicMail;
    newMesage.recieverId = recieverId;
    newMesage.parentMessageId = lastMessageId + 1;
    newMesage.status = 'sent';
    messageData.message.push(newMesage);
    return newMesage;
  },

  deleteSingleEmail(epicMail, id) {
    const userEmail = messageData.message
      .find(mail => mail.recieverId === epicMail && mail.id === id);
    if (userEmail) {
      const emailIndex = messageData.message.indexOf(userEmail);
      const delMail = messageData.message.splice(emailIndex, 1);
      return delMail;
    }
    return false;
  },
};

export default messageService;
