const { Joi } = require('celebrate');

module.exports = {
  create: {
    body: {
      date: Joi.date().required(),
      time: Joi.string().required(),
      home_team: Joi.string().required(),
      away_team: Joi.string().required(),
      away: Joi.string().required(),
      home: Joi.string().required(),
      stadium: Joi.string().required(),
      status: Joi.string(),
    },
  },
  editFixture: {
    body: {
      date: Joi.date(),
      time: Joi.string(),
      home_team: Joi.string(),
      away_team: Joi.string(),
      stadium: Joi.string(),
      status: Joi.string(),
      result: Joi.string(),
      isDeleted: Joi.boolean(),
      home: Joi.string(),
      away: Joi.string(),
    },
    params: {
      id: Joi.string(),
    },
  },
  delete: {
    body: {
      isDeleted: Joi.boolean().required(),
    },
    params: {
      id: Joi.string().hex(),
    },
  },
};
