import uuid from 'uuid';
import userData from '../utils/dummyUserData';
import User from '../models/user.model';

const epic = '@epicmail.com';

const userService = {
  createUser(user) {
    const {
      email,
      firstName,
      lastName,
      hashPassword,
    } = user;
    const userEpicMail = `${firstName}${lastName}${epic}`;
    const findUser = this.checkUser(userEpicMail);
    if (findUser) {
      return false;
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
  },
  checkUser(epicMail) {
    const userExist = userData.user.find(user => user.epicMail === epicMail);
    return userExist;
  },
};
export default userService;
