require('dotenv').config();
const httpStatus = require('http-status');
const Team = require('../models/Team.model');
const sendResponse = require('../helpers/response');

const TeamController = () => {
  const load = async (req, res, next, id) => {
    try {
      let team = await Team.get(id);
      if (team) {
        req.team = team;
        return next();
      }
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const { name } = req.body;

      const teamExist = await Team.getBy({ name });
      if (teamExist[0]) {
        return res.json(
          sendResponse(
            httpStatus.BAD_REQUEST,
            'Team already added',
            null,
            'Team name exist',
          ),
        );
      }

      const team = new Team(req.body);
      await team.save();
      return res.json(
        sendResponse(httpStatus.OK, 'Team successfully added', team),
      );
    } catch (error) {
      next(error);
    }
  };
  const editTeam = async (req, res) => {
    console.log('got here');
    if (req.team.isDeleted) {
      return res.json(
        sendResponse(httpStatus.NOT_FOUND, 'Team already deleted', null),
      );
    }

    try {
      const team = await req.team.update(req.body);
      res.json(sendResponse(httpStatus.OK, 'success', team));
    } catch (error) {
      res.json(
        sendResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          'Something went wrong',
          null,
        ),
      );
    }
  };

  const deleteTeam = async (req, res) => {
    const { isDeleted } = req.body;
    if (req.team.isDeleted) {
      return res.json(
        sendResponse(httpStatus.NOT_FOUND, 'Team already deleted', null),
      );
    }
    try {
      await req.team.update({ isDeleted });
      res.json(sendResponse(httpStatus.ok, 'success', null));
    } catch (error) {
      res.json(
        sendResponse(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong'),
      );
    }
  };

  const getTeam = async (req, res, next) => {
    try {
      let team = req.team;
      if (team.isDeleted) {
        return res.json(
          sendResponse(httpStatus.NOT_FOUND, 'Team already deleted', null),
        );
      }
      return res.json(sendResponse(httpStatus.OK, 'success', team));
    } catch (error) {
      next(error);
    }
  };

  const getTeams = async (req, res, next) => {
    try {
      let teams = await Team.getBy({ isDeleted: false });
      return res.json(sendResponse(httpStatus.OK, 'success', teams));
    } catch (error) {
      next(error);
    }
  };

  const searchTeam = async (req, res, next) => {
    console.log(Object.values(req.query)[0]);
    let query = Object.values(req.query)[0];
    if (!query) {
      return res.json(sendResponse(httpStatus.OK, 'Teams found', []));
    }

    try {
      const results = await Team.search(query);
      if (results.length < 1) {
        return res.json(sendResponse(httpStatus.NOT_FOUND, 'Team not founds'));
      }
      return res.json(sendResponse(httpStatus.OK, 'Team found', results));
    } catch (error) {
      next(error);
    }
  };

  return {
    load,
    create,
    editTeam,
    deleteTeam,
    getTeam,
    getTeams,
    searchTeam,
  };
};

module.exports = TeamController();
