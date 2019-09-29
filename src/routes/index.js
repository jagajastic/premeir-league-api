const express = require('express');
const userRoute = require('./users.route');
const adminRoutes = require('./admin.route');
const authRoute = require('./auth.route');
const teamRoute = require('./team.route');
const fixtureRoutes = require('./fixture.route');
const searchRoutes = require('./search.route');
const router = express.Router();

/* GET health-check - check service health */
router.get('/health-check', (req, res) =>
  res.send('Everything is going to be alright!'),
);

// mount user routes at /user
router.use('/user', userRoute);

// mount admin route
router.use('/admin', adminRoutes);

// mount admin route
router.use('/auth', authRoute);

// mount team route
router.use('/team', teamRoute);

// mount fixture route
router.use('/fixture', fixtureRoutes);

// mount search
router.use('/search', searchRoutes);

module.exports = router;
