class User {
  constructor() {
    this.id = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.password = null;
    this.epicMail = `${this.firstName}${this.lastName}@epicmail.com`;
  }
}
export default User;
