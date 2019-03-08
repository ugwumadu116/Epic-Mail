import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.registerUser);
router.post('/auth/login', UserController.loginUser);
export default router;
