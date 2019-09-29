const moment = require('moment-timezone');
const jwt = require('jwt-simple');

const { jwtExpirationInterval, jwtSecret } = require('../config/env');

/**
 * Token Encoder
 * @param {string} email
 * @param {string} id
 * @param {Boolean} isAdmin
 */
const EncodeToken = (email, id, isAdmin) => {
  const payload = {
    exp: moment()
      .add(jwtExpirationInterval, 'days')
      .unix(),
    iat: moment().unix(),
    sub: id,
    email,
    isAdmin,
  };
  return jwt.encode(payload, jwtSecret);
};

module.exports = EncodeToken;
