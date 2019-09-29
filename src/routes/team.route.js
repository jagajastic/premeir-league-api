const express = require('express');
const { celebrate: validate, error } = require('celebrate');
const requestValidate = require('../validations/team.validation');
const decode = require('../middlewares/decode');
const adminAuth = require('../middlewares/adminAuth.middleware');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.param('id', teamController.load);

router.use(decode);

router.route('/').get(teamController.getTeams);

router.route('/:id').get(teamController.getTeam);

router.use(adminAuth);

router
  .route('/')
  .post(
    validate(requestValidate.create, { abortEarly: false }),
    teamController.create,
  );

router
  .route('/:id')
  .put(
    validate(requestValidate.editTeam, { abortEarly: false }),
    teamController.editTeam,
  );

router
  .route('/:id')
  .delete(
    validate(requestValidate.delete, { abortEarly: false }),
    teamController.deleteTeam,
  );

module.exports = router;
