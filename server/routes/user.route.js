import express from 'express';
import UserController from '../controllers/user.controller';
import validator from '../helpers/validator';
import CheckUserReq from '../middleware/user';

const router = express.Router();

router.post('/auth/signup',
  validator.signUpValidation,
  CheckUserReq.userReqCheck,
  UserController.registerUser);

router.post('/auth/login',
  validator.loginValidation,
  CheckUserReq.userReqCheck,
  UserController.loginUser);

export default router;
