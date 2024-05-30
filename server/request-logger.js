const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

/**
 * Create a logger for HTTP request
 * @returns {function} Function to logger the HTTP request
 */
function setupRequestLogger() {
    // Create a write stream (in append mode) to a log file in the log folder
    const logFolderPath = path.join(__dirname, '/logs');
    const logFilePath = path.join(logFolderPath, 'request.log');
    fs.mkdirSync(logFolderPath, { recursive: true }); // Create the log folder if it doesn't exist
    const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  
    // Setup the logger to console
    const requestLoggerConsole = morgan('combined');
    // Setup the logger with the write stream
    const requestLoggerFile = morgan('combined', { stream: accessLogStream });

    return { requestLoggerConsole, requestLoggerFile }
  }

  module.exports = setupRequestLogger;