//const winston = require('winston')
const logger = require('../utils/logger.js');

exports.addLogger = (req, res, next ) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`);
    next()
};

