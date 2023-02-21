module.exports = function (app) {
  const userController = require('../../../presentation/controllers/userController');

  app.Controllers = [];
  app.Controllers.AuthenticationController = new userController(app);
};
