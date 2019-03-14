class User {
  constructor() {
    this.id = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.password = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.epicMail = `${this.firstName}${this.lastName}@epicmail.com`;
  }
}
export default User;
