const express = require('express');
const { celebrate: validate, error } = require('celebrate');
const requestValidate = require('../validations/fixture.validation');
const decode = require('../middlewares/decode');
const adminAuth = require('../middlewares/adminAuth.middleware');
const fixtureController = require('../controllers/fixtureController');
const router = express.Router();

// load team when API with id route parameter is import PropTypes from 'prop-types';

router.param('id', fixtureController.load);

router.use(decode);

router.route('/').get(fixtureController.getFixtures);

router.route('/:id').get(fixtureController.getFixture);

router.use(adminAuth);

router
  .route('/')
  .post(
    validate(requestValidate.create, { abortEarly: false }),
    fixtureController.create,
  );

router
  .route('/:id')
  .put(
    validate(requestValidate.editFixture, { abortEarly: false }),
    fixtureController.editFixture,
  );

router
  .route('/:id')
  .delete(
    validate(requestValidate.delete, { abortEarly: false }),
    fixtureController.deleteFixture,
  );

module.exports = router;
