import express from 'express';
import trimRequest from 'trim-request';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middleware/userValidator';

const router = express.Router();

router.post('/auth/signup',
  trimRequest.body,
  UserMiddleware.validateRegister,
  UserController.registerUser);

router.post('/auth/login',
  trimRequest.body,
  UserMiddleware.validateLogin,
  UserController.loginUser);

export default router;
