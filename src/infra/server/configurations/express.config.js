const express = require('express');
const configureServices = require('./services/services.config');
const configureExpressMiddleware = require('./expressMiddleware.config');
const controllerConfig = require('./controllers.config');
const routes = require('./routes.config');
const httpConfig = require('./web/https.config');
const apiConfig = require('../parameters/api.parameters');

module.exports = async function configure(sequelize) {
  const api = express();
  const httpApi = express();
  const router = express.Router();
  api.database = sequelize;

  await configureServices(api);
  configureExpressMiddleware(api);
  controllerConfig(api);
  api.use('/api', routes(api, router));

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
  ) {
    const httpsServer = httpConfig(httpApi, api);
    httpsServer.listen(apiConfig.ssl_port, () => {
      console.log('Server its up and running on port: ' + apiConfig.port);
    });
  } else {
    api.listen(apiConfig.port, function () {
      console.log('Server up and running on port ' + apiConfig.port);
    });
  }

  return api;
};
