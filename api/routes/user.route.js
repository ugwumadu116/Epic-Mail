import express from 'express';
import trimRequest from 'trim-request';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middleware/userValidator';
import CheckMiddleware from '../middleware/helpers';

const router = express.Router();

router.post('/auth/signup',
  trimRequest.body,
  UserMiddleware.validateRegister,
  CheckMiddleware.checkIfEmailAlreadyExist,
  UserController.registerUser);

router.post('/auth/login',
  trimRequest.body,
  UserMiddleware.validateLogin,
  CheckMiddleware.checkLoginEmail,
  UserController.loginUser);

export default router;
