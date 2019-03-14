import express from 'express';
import trimRequest from 'trim-request';
import userAuth from '../middleware/userAuth';
import MessageController from '../controllers/message.controller';
import UserMiddleware from '../middleware/userValidator';

const router = express.Router();

router.get('/', userAuth.validate, MessageController.getEmail);
router.get('/unread', userAuth.validate, MessageController.getUnreadEmail);
router.get('/sent', userAuth.validate, MessageController.getSentEmail);
router.get('/:id', userAuth.validate, MessageController.getAnEmail);
router.post('/',
  trimRequest.body,
  UserMiddleware.validatePostMail,
  userAuth.validate,
  MessageController.PostAnEmail);
router.delete('/:id', userAuth.validate, MessageController.deleteAnEmail);
export default router;
