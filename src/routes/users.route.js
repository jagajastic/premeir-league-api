const express = require('express');
const decode = require('../middlewares/decode');
userControl = require('../controllers/userController');
const { celebrate: validate, error } = require('celebrate');
const fixtureController = require('../controllers/fixtureController');
const paramValidation = require('../validations/user.validation');

const router = express.Router();

/* GET users listing. */
router.param('userId', userControl.load);

//
router.post(
  '/login',
  validate(paramValidation.login, { abortEarly: true }),
  userControl.login,
);

router.use(decode);

router.route('/:userId');
router.route('/fixture/pending').get(fixtureController.getPendingFixtures);

router.route('/fixture/completed').get(fixtureController.getCompletedFixtures);

module.exports = router;
