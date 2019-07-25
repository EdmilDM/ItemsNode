const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  file_all: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  file_error: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
  },
};

const myFormat = winston.format.printf(({level, message, timestamp}) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file_all),
    new winston.transports.File(options.file_error),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
  format: winston.format.combine(
      winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
      myFormat,
  ),
});

module.exports = logger;
