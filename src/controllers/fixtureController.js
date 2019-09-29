require('dotenv').config();
const httpStatus = require('http-status');
const Fixture = require('../models/Fixture.model');
const sendResponse = require('../helpers/response');

const TeamController = () => {
  const load = async (req, res, next, id) => {
    try {
      let fixture = await Fixture.get(id);
      if (fixture) {
        req.fixture = fixture;
        return next();
      }
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const fixture = new Fixture(req.body);
      await fixture.save();
      res.json(
        sendResponse(httpStatus.OK, 'Fixture successfully added', fixture),
      );
    } catch (error) {
      next(error);
    }
  };

  const editFixture = async (req, res) => {
    if (req.fixture.isDeleted) {
      return res.json(
        sendResponse(httpStatus.NOT_FOUND, 'Fixture already deleted', null),
      );
    }

    try {
      const fixture = await req.fixture.update(req.body);
      res.json(sendResponse(httpStatus.OK, 'success', fixture));
    } catch (error) {
      res.json(
        sendResponse(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong'),
      );
    }
  };

  const deleteFixture = async (req, res) => {
    const { isDeleted } = req.body;
    if (req.fixture.isDeleted) {
      return res.json(
        sendResponse(httpStatus.NOT_FOUND, 'Fixture already deleted', null),
      );
    }
    try {
      await req.fixture.update({ isDeleted });
      res.json(sendResponse(httpStatus.OK, 'success', null));
    } catch (error) {
      res.json(
        sendResponse(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong'),
      );
    }
  };

  const getFixture = (req, res, next) => {
    try {
      let fixture = req.fixture;
      if (fixture.isDeleted) {
        return res.json(
          sendResponse(httpStatus.NOT_FOUND, 'Team already deleted'),
        );
      }
      return res.json(sendResponse(httpStatus.OK, 'Success', fixture));
    } catch (error) {
      next(error);
    }
  };

  const getFixtures = async (req, res, next) => {
    try {
      let fixtures = await Fixture.getBy({ isDeleted: false });
      return res.json(sendResponse(httpStatus.OK, 'success', fixtures));
    } catch (error) {
      next(error);
    }
  };

  const searchFixture = async (req, res, next) => {
    let query = Object.values(req.body)[0];
    if (query)
      return res.json(sendResponse(httpStatus.OK, 'Fixture Found', []));

    try {
      const results = await Fixture.search(query);
      if (results.length < 1) {
        return res.json(
          sendResponse(httpStatus.NOT_FOUND, 'Fixture not found', []),
        );
      }
      return res.json(sendResponse(httpStatus.OK, 'Fixtures found', results));
    } catch (error) {
      next(error);
    }
  };

  const getPendingFixtures = async (req, res, next) => {
    try {
      const results = await Fixture.getBy({ status: 'Pending' });
      return res.json(sendResponse(httpStatus.OK, 'Fixtures found', results));
    } catch (error) {
      next(error);
    }
  };

  const getCompletedFixtures = async (req, res, next) => {
    try {
      const results = await Fixture.getBy({ status: 'Completed' });
      return res.json(sendResponse(httpStatus.OK, 'Fixtures found', results));
    } catch (error) {
      next(error);
    }
  };

  return {
    load,
    create,
    getFixture,
    editFixture,
    getFixtures,
    searchFixture,
    deleteFixture,
    getPendingFixtures,
    getCompletedFixtures,
  };
};

module.exports = TeamController();
