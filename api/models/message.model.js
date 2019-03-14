class Message {
  constructor() {
    this.id = null;
    this.createdOn = null;
    this.subject = null;
    this.message = null;
    this.senderEmail = null;
    this.receiverEmail = null;
    this.parentMessageId = null;
    this.status = 'sent' || 'draft' || 'read';
  }
}

export default Message;
