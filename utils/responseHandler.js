const logger = require('../utils/loggingEngine');
const messages = require('../constants/successResponseMessages.json');
 
module.exports = (req, res, next, status, messageCode, data) => {
  logger.info({apiUrl: req.url, body: req.body, status: status, message: messages[messageCode], data: data });
  res.status(200).json({
    status: status,
    code: messageCode,
    message: messages[messageCode],
    data: data
  });
};