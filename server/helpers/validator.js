import { check, param, body } from 'express-validator/check';

const loginValidation = [
  body('epicMail',
    'Epic mail must be alphabets and at least 2 characters long')
    .isLength({ min: 2 })
    .matches('[^@]+@epicmail.com')
    .trim(),
  body(
    'password',
    'Please enter a password at least 6 characters long',
  )
    .isLength({ min: 6 })
    .trim(),
];

const signUpValidation = [
  body('epicMail',
    'Epic mail must be alphabets and at least 6 characters long')
    .isLength({ min: 6 })
    .isAlpha()
    .trim(),
  body(
    'password',
    'Please enter a password at least 6 characters long',
  )
    .trim()
    .isLength({ min: 6 }),
  body('phone', 'A valid phone number is required')
    .isMobilePhone()
    .trim(),
  body('firstName', 'First name with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
  body('lastName', 'Last name with minimum of 2 characters long is required')
    .isLength({ min: 2 })
    .trim(),
];
const postMessageValidation = [
  check('subject')
    .isLength({ min: 2 })
    .withMessage('Subject is required with minimun length of 2 characters'),
  check('message')
    .isLength({ min: 2 })
    .withMessage('Message is required with minimum length of 2 characters')
    .trim(),
];

const postGroupValidation = [
  check(
    'name',
    'Name is required to be only number and letters with 2 minimum characters',
  )
    .trim()
    .isLength({ min: 2 })
    .isAlphanumeric(),
];

const GroupIdValidation = [param('groupid', 'Invalid group id').isNumeric()];

const deleteUserFromGroupValidation = [
  param('groupid', 'Invalid group id').isNumeric(),
  param('userid', 'Invalid user id').isNumeric(),
];
const postMessageToGroupValidation = [
  param('groupid', 'Invalid group id').isNumeric(),
  check(
    'subject',
    'Subject is required with minimun length of 2 characters',
  ).isLength({ min: 2 }),
  check(
    'message',
    'Message is required with minimu length of 2 characters',
  ).isLength({ min: 2 }),
];

const updateGroupValidator = [
  param('groupid', 'Invalid group id').isNumeric(),
  check(
    'name',
    'Name is required to be only number and letters with 2 minimum characters',
  )
    .trim()
    .isLength({ min: 2 })
    .isAlphanumeric(),
];

const messageIdValidation = [param('id', 'Invalid message id').isNumeric()];

export default {
  postMessageValidation,
  postGroupValidation,
  GroupIdValidation,
  deleteUserFromGroupValidation,
  postMessageToGroupValidation,
  updateGroupValidator,
  messageIdValidation,
  signUpValidation,
  loginValidation,
};
