import express from 'express';
import trimRequest from 'trim-request';
import userAuth from '../middleware/userAuth';
import MessageController from '../controllers/message.controller';
import MessageMiddleware from '../middleware/messageValidator';
import CheckMiddleware from '../middleware/helpers';

const router = express.Router();

router.get('/', userAuth.validate, MessageController.getEmail);
router.get('/unread', userAuth.validate, MessageController.getUnreadEmail);
router.get('/sent', userAuth.validate, MessageController.getSentEmail);
router.get('/:id',
  userAuth.validate,
  CheckMiddleware.paramIdValid,
  CheckMiddleware.checkIfMessageExist,
  MessageController.getAnEmail);

router.post('/',
  trimRequest.body,
  userAuth.validate,
  MessageMiddleware.validatePostMail,
  CheckMiddleware.checkIfReceiverEmailExist,
  MessageController.PostAnEmail);

router.delete('/:id',
  userAuth.validate,
  CheckMiddleware.paramIdValid,
  CheckMiddleware.checkIfMessageExist,
  CheckMiddleware.getUserId,
  MessageController.deleteAnEmail);

export default router;
