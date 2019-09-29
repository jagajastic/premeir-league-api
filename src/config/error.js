const httpStatus = require('http-status');
const { isCelebrate } = require('celebrate');

const APIError = require('../helpers/APIError');
const { customErrorMessage } = require('../helpers/joiCustomError');

const handler = (err, req, res, next) => {
  const response = {
    statusCode: err.status,
    message: err.messsage || httpStatus[err.status],
    erors: err.errors,
    payload: null,
    stack: err.stack,
  };

  if (process.env.NODE_ENV !== 'development') {
    delete response.stack;
  }

  res.json(response);
};

exports.handler = handler;

expoers.converter = (err, req, res, next) => {
  let convertedError = err;
  if (isCelebrate(err)) {
    convertedError = new APIError({
      message: 'Invalid fields',
      status: httpStatus.BAD_REQUEST,
      errors: customErrorMessage(err.joi.detils) || {},
      payload: {},
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

exports.errorHandler = (err, req, res, next) => {
  if (err) {
    const tokenError = new APIError('Unauthorized', err.status, true);
    next(tokenError);
  }
  next();
};

exports.notFound = (req, res) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
