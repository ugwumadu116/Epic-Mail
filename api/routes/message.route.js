import express from 'express';
import userAuth from '../middleware/userAuth';
import MessageController from '../controllers/message.controller';

const router = express.Router();

router.get('/', userAuth.validate, MessageController.getEmail);
router.get('/unread', userAuth.validate, MessageController.getUnreadEmail);
export default router;
