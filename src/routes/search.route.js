const express = require('express');
const fixtureController = require('../controllers/fixtureController');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.route('/team').get(teamController.searchTeam);

router.route('/fixture').get(fixtureController.searchFixture);

module.exports = router;
