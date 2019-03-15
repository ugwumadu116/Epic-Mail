import uuid from 'uuid';
import userData from '../utils/dummyUserData';
import User from '../models/user.model';

const epic = '@epicmail.com';

class UserService {
  static async createUser(user) {
    try {
      const {
        email,
        firstName,
        lastName, hashPassword,
      } = user;
      const newEmail = email.split('@')[0];
      const userEpicMail = `${newEmail}${epic}`;
      const findUser = await this.checkUser(userEpicMail);
      if (findUser) {
        throw Error();
      }
      const newUser = new User();
      newUser.id = uuid.v4();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = hashPassword;
      newUser.epicMail = userEpicMail;
      userData.user.push(newUser);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  static async checkUser(epicMail) {
    try {
      const userExist = await userData.user.find(user => user.epicMail === epicMail);
      return userExist;
    } catch (err) {
      return err;
    }
  }
}
export default UserService;
