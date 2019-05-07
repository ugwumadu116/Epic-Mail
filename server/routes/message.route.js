import express from 'express';
import trimRequest from 'trim-request';
// import validator from '../helpers/validator';
// import userAuth from '../middleware/userAuth';
// import MessageController from '../controllers/message.controller';
// import CheckMiddleware from '../middleware/helpers';
// import CheckUserReq from '../middleware/user';
import verify from '../middleware/tokenHandler';

const router = express.Router();

// router.get('/', userAuth.validate, MessageController.getEmail);
// router.get('/unread', userAuth.validate, MessageController.getUnreadEmail);
// router.get('/sent', userAuth.validate, MessageController.getSentEmail);
// router.get('/:id',
//   userAuth.validate,
//   CheckMiddleware.paramIdValid,
//   CheckMiddleware.checkIFMessageExist,
//   MessageController.getAnEmail);

router.post('/',
  trimRequest.body,
  verify.verifyToken);
// validator.postMessageValidation,
// CheckUserReq.userReqCheck);
// MessageController.PostAnEmail);

// router.delete('/:id',
//   userAuth.validate,
//   CheckMiddleware.paramIdValid,
//   CheckMiddleware.checkIFMessageExist,
//   CheckMiddleware.getUserId,
//   MessageController.deleteAnEmail);

export default router;
