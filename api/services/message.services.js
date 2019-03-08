import messageData from '../utils/dummyMessageData';

const messageService = {
  getUserEmails(epicMail) {
    const userEmail = messageData.message.filter(mail => mail.recieverId === epicMail);
    return userEmail;
  },
  getUnreadEmails(epicMail) {
    const userEmail = messageData.message.filter(mail => mail.recieverId === epicMail && mail.status === 'sent');
    return userEmail;
  },
  getSentEmails(epicMail) {
    const userEmail = messageData.message.filter(mail => mail.senderId === epicMail);
    return userEmail;
  },
};

export default messageService;
