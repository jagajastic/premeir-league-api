const express = require('express');
const { celebrate: validate, error } = require('celebrate');
const paramValidation = require('../validations/user.validation');
const decode = require('../middlewares/decode');
const adminAuth = require('../middlewares/adminAuth.middleware');
const userController = require('../controllers/userController');
const router = express.Router();

router.param('userId', userController.load);

router
  .route('/')
  .post(validate(paramValidation.createUser, { abortEarly: true }));

router.use(decode);
router.use(adminAuth);

router.route('/').get(userController.getAllUser);

module.exports = router;
