import express from 'express';
import userAuth from '../middleware/userAuth';
import MessageController from '../controllers/message.controller';

const router = express.Router();

router.get('/', userAuth.validate, MessageController.getEmail);
export default router;