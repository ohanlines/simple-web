const colors = require('colors');

const logger = {
  info: function(message) {
    console.log(colors.green('[INFO]'), message);
  },
  warn: function(message) {
    console.log(colors.yellow('[WARN]'), message);
  },
  error: function(message) {
    console.log(colors.red('[ERROR]'), message);
  }
};

module.exports = { logger };
