const logger = require('./loggingEngine.js');
const messages = require('../constants/errorResponseMessages.json');
 
exports.invalidEndPoint = (req, res, next) => {
  const error = new Error('Invalid Endpoint!');
  error.statusCode = 404;
  throw error;
};
 
exports.createError = statusCode => {
  const error = new Error(messages[statusCode]);
  error.statusCode = statusCode;
  throw error;
};
 
exports.makeErrorResponse = error => {
    console.log(error)
  const status = error.statusCode || 500;
  const message = error.message || 'Server Error';
  logger.error({ error: { message: message } });
  let res = { status: false, code: status, message: message, data: {} };
  return res;
};
 
exports.validate = (parameters, requestBody) => {
  res = false;
  parameters.forEach(param => {
    if (!(param in requestBody)) res = true;
  });
  return res;
};