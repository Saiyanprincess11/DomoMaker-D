const controllers = require('./controllers');
const mid = require('./middleware');

// URL routing for app
const router = (app) => {
  // Middleware fires in order and if it passes, moves to the next function
  // If criteria isn't met, loads different page and breaks flow
  app.get('/getPlaylists', mid.requiresLogin, controllers.Playlist.getPlaylists);
  app.get('/getSongs', mid.requiresLogin, controllers.Song.getSongs);

  app.get('/maker', mid.requiresLogin, controllers.Playlist.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Playlist.makePlaylist);

  app.post('/addSong', mid.requiresLogin, controllers.Song.makeSong);

  app.get('/removePlaylist', mid.requiresLogin, controllers.Playlist.getPlaylists);
  app.post('/removePlaylist', mid.requiresLogin, controllers.Playlist.removePlaylist);

  app.get('/removeSong', mid.requiresLogin, controllers.Song.getSongs);
  app.post('/removeSong', mid.requiresLogin, controllers.Song.removeSong);

  app.get('/addSongToPlaylist', mid.requiresLogin, controllers.Playlist.getPlaylists);
  app.post('/addSongToPlaylist', mid.requiresLogin, controllers.Playlist.addSongtoPlaylist);

  //app.get('/callAPI', mid.requiresLogin, controllers.Song.callAPI);
  //app.post('/callAPI', mid.requiresLogin, controllers.Song.showAPI);

  app.get('/getSearchTerm', mid.requiresLogin, controllers.Song.getSearch);
  app.post('/getSearchTerm', mid.requiresLogin, controllers.Song.showSearchRes);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // app.get('/deletePlaylist', mid.requiresLogin, controllers.Playlist.makerPage);
  // app.post('/deletePlaylist', mid.requiresLogin, controllers.Playlist.deletePlaylist);

  // app.get('/about', mid.requiresSecure, mid.requiresLogout, controllers.Song.aboutPage);
  // app.get('/contact', mid.requiresSecure, mid.requiresLogout, controllers.Song.contactPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.homePage);

  // app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
