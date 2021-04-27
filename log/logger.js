const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "logfile.log",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URL,
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "uncaughtRejections.log",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),
  ],
  exitOnError: true,
});
