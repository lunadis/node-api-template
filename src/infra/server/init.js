const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

const initDatabase = require('./configurations/database.config');

const configureExpress = require('./configurations/express.config');

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

initDatabase().then(function (sequelize) {
  return configureExpress(sequelize);
});
