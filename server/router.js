const controllers = require('./controllers');
const mid = require('./middleware');

// URL routing for app
const router = (app) => {
  // Middleware fires in order and if it passes, moves to the next function
  // If criteria isn't met, loads different page and breaks flow

  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos); 

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);

  app.get('/about', mid.requiresLogin, controllers.Domo.aboutPage);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
