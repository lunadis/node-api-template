const SecurityRouter = require('security-route').Router;
const roleList = require('../parameters/roles.parameters');
// const Session = require('../../../domain/auth/services/Session.js');
const userRotes = require('../../routes/user.rotes');

module.exports = (app, router) => {
  const securityRouter = SecurityRouter(router, roleList, () => {
    console.log('fez alguma coisa para sessão');
  });

  userRotes(app, securityRouter);

  return securityRouter.getRouter();
};
