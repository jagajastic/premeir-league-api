const moment = require('moment-timezone');
const jwt = require('jwt-simple');

const jwtExpirationInterval = 86400;
const jwtSecret = 'abcdefghijklmnopqrstuvwxyz0987654321';

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
