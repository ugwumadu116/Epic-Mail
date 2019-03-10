import express from 'express';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middleware/userValidator';

const router = express.Router();

router.post('/auth/signup', UserMiddleware.validateRegister, UserController.registerUser);
router.post('/auth/login', UserMiddleware.validateLogin, UserController.loginUser);

export default router;
