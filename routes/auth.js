const passport = require('passport');

const { User } = require("../project");

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// google login route
routes.get("/senior_project/auth/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get('/senior_project/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/start');
  });

// profile
routes.get('/senior_project/start', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
// log out
  res.redirect('./start.html');
});


routes.get('/senior_project/logout.html', (req, res) => {
  req.logout(() => {
    res.redirect('./logout.html');
  });
});

const path = require('path');

routes.get("/senior_project/start.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'start.html'));
});

module.exports = routes;