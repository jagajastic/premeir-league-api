const express = require('express');
const { celebrate: validate, error } = require('celebrate');
const paramValidation = require('../validations/user.validation');
const userController = require('../controllers/userController');
const router = express.Router();

// POST /api/v1/user /

router
  .route('/register')
  .post(
    validate(paramValidation.createUser, { abortEarly: false }),
    userController.signup,
  );

// login a login
router.post(
  '/login',
  validate(paramValidation.login, { abortEarly: false }),
  userController.login,
);

// admin login
router.post(
  '/admin/login',
  validate(paramValidation.login, { abortEarly: false }),
  userController.login,
);

module.exports = router;
