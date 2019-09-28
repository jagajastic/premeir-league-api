const httpStatus = require('http-status');

/**
 * custome API error
 *
 * @class ExtendableError
 * @extends {Error}
 */
class ExtendableError extends Error {
  constructor({ message, errors, status, isPublic, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    this.stack = stack;
  }
}

/**
 *Custome API error extendables
 *
 * @class APIError
 * @extends {ExtendableError}
 */
class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

module.exports = APIError;
