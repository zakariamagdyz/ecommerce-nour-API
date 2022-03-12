const winston = require("winston");

// date + logger Level + message

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

class Logger {
  constructor(route) {
    this.route = route;
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
          info.message
        }`;

        message = info.obj
          ? message.concat(` data ${JSON.stringify(info.obj)}`)
          : message;

        return message;
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `./log / ${route}.log` }),
      ],
    });
  }

  info(message, obj) {
    if (!obj) {
      return this.logger.log("info", message);
    }

    return this.logger.log("info", message, { obj });
  }

  error(message, obj) {
    if (!obj) {
      return this.logger.log("error", message);
    }

    this.logger.log("error", message, { obj });
  }

  debug(message) {
    if (!obj) {
      return this.logger.log("debug", message);
    }

    this.logger.log("debug", message, { obj });
  }
}

module.exports = Logger;
