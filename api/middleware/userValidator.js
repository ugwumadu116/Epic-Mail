import Joi from 'joi';

class UserMiddleware {
  static async validateRegister(req, res, next) {
    try {
      const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
          .email()
          .regex(/[^@]+@[^.]+\..+/)
          .required(),
        password: Joi.string()
          .min(7)
          .required(),
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: String(err.details[0].message),
        type: 'validation',
      });
    }
  }

  static async validateLogin(req, res, next) {
    try {
      const schema = {
        epicMail: Joi.string()
          .email()
          .regex(/[^@]+@epicmail.com/)
          .required(),
        password: Joi.string()
          .min(7)
          .required(),
      };
      await Joi.validate(req.body, schema);
      next();
      return true;
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: String(err.details[0].message),
        type: 'validation',
      });
    }
  }
}

export default UserMiddleware;
