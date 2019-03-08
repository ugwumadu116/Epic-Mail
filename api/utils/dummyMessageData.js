export default {
  message: [
    {
      id: 1,
      createdOn: Date.now(),
      subject: 'Welcome to bootcamp',
      message: 'In bootcamp we code!!!',
      senderId: 'joelugwumadu2@epicmail.com',
      recieverId: 'macaulayugwumadu@epicmail.com',
      parentMessageId: 0,
      status: 'sent',
    },
    {
      id: 2,
      createdOn: Date.now(),
      subject: 'The epic Tower',
      message: 'This where opportunity is evenly distributed!!!',
      senderId: 'macaulayugwumadu@epicmail.com',
      recieverId: 'joelugwumadu2@epicmail.com',
      parentMessageId: 1,
      status: 'read',
    },
    {
      id: 3,
      createdOn: Date.now(),
      subject: 'Factors that affect developers in nigeria',
      message: 'Power supply and access to internet are the major factors',
      senderId: 'macaulayugwumadu@epicmail.com',
      recieverId: 'joelugwumadu2@epicmail.com',
      parentMessageId: 2,
      status: 'sent',
    },
  ],
};
