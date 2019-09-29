const { Joi } = require('celebrate');

module.exports = {
  createUser: {
    body: {
      name: Joi.string()
        .min(1)
        .max(120)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(20)
        .required(),
      isAdmin: Joi.boolean(),
      favoriteTeam: Joi.string(),
    },
  },

  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(20)
        .required(),
    },
  },
};
