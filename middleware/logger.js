const winston = require('winston');
const expressWinston = require('express-winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

const requestLogger = expressWinston.logger({
  transports: [logger.transports[0]],
  format: logger.format,
});

const errorLogger = expressWinston.errorLogger({
  transports: [logger.transports[1]],
  format: logger.format,
});

module.exports = {
  requestLogger,
  errorLogger,
};
