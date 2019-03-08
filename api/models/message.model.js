class Message {
  constructor() {
    this.id = null;
    this.createdOn = null;
    this.subject = null;
    this.message = null;
    this.senderId = null;
    this.recieverId = null;
    this.parentMessageId = null;
    this.status = 'sent' || 'draft' || 'read';
  }
}

export default Message;
