/**
 * @params {number} statusCode
 * @params {string} message
 * @params {object} payload
 * @params {error} error
 * @params {Token} token
 * @returns {object}
 */

module.exports = function(statusCode, message, payload, error, token) {
  return {
    statusCode,
    message,
    payload,
    error,
    token,
  };
};
