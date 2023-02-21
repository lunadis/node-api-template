module.exports = (app, router) => {
  router.addRoute({
    verb: 'post',
    path: '/auth',
    action: app.Controllers.AuthenticationController.createUser,
    role: ['ANONYMOUS'],
  });
  router.addRoute({
    verb: 'get',
    path: '/auth',
    action: (req, res) => {
      res.send('deu certo caraio');
    },
    role: ['ANONYMOUS'],
  });
};
