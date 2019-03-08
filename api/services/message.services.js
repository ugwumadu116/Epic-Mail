import messageData from '../utils/dummyMessageData';

const messageService = {
  getUserEmails(epicMAil) {
    const userEmail = messageData.message.filter(mail => mail.recieverId === epicMAil);
    return userEmail;
  },
};

export default messageService;
