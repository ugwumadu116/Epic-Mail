import UserChecker from '../helpers/userValidator';

class checkRequestInput {
  static async userReqCheck(req, res, next) {
    try {
      await UserChecker.userCheck(req);
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.mapped(),
      });
    }
  }
}

export default checkRequestInput;
