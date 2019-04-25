// import Joi from 'joi';

// class MessageMiddleware {
//   static async validatePostMail(req, res, next) {
//     try {
//       const schema = {
//         subject: Joi.string().required(),
//         message: Joi.string().required(),
//         receiverEmail: Joi.string()
//           .email()
//           .required(),
//       };
//       await Joi.validate(req.body, schema);
//       next();
//       return true;
//     } catch (err) {
//       return res.status(400).json({
//         status: 'error',
//         message: String(err.details[0].message),
//         type: 'validation',
//       });
//     }
//   }
// }

// export default MessageMiddleware;
