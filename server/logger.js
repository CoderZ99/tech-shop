const winston = require("winston");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize, prettyPrint } = format;

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "logs");
fs.existsSync(logDir) || fs.mkdirSync(logDir);

// Custom uppercase format
const upperCaseFormat = format((info) => {
  info.level = info.level.toUpperCase();
  return info;
})();

// Custom format for console logging
const consoleFormat = combine(
  upperCaseFormat,
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} ${level}: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += ' ' + JSON.stringify(metadata, null, 2);
    }
    return msg;
  })
);

// Custom format for file logging
const fileFormat = combine(
  upperCaseFormat,
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  prettyPrint()
);

// Create a Winston logger instance
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: fileFormat,
  transports: [
    // Console transport
    new transports.Console({
      format: consoleFormat
    }),
    // Error log file
    new transports.File({ 
      filename: path.join(logDir, "error.log"),
      level: "error"
    }),
    // Combined log file
    new transports.File({ 
      filename: path.join(logDir, "combined.log")
    })
  ]
});

// Create HTTP request logger middleware
const requestLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
  {
    stream: fs.createWriteStream(path.join(logDir, "requests.log"), { flags: "a" }),
    skip: (req, res) => process.env.NODE_ENV === "production" && res.statusCode < 400
  }
);

// Export both loggers
module.exports = { logger, requestLogger };
