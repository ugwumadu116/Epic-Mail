import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.registerUser);
export default router;
