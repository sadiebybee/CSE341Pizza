const passport = require('passport');

const { User } = require("../project");

const routes = require("express").Router();

routes.get("/api-docs", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// google login route
routes.get("/api-docs/auth/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get('/api-docs/auth/',
  passport.authenticate('google', { failureRedirect: '/auth/signin' }),
  (req, res) => {
    res.redirect('/api-docs');
  });

// profile
routes.get('/api-docs', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/signin');
  }
// log out
  res.redirect('/auth/signin');
});


// routes.get('/api-docs/logout.html', (req, res) => {
//   req.logout(() => {
//     res.redirect('./logout.html');
//   });
// });

// const path = require('path');

// routes.get("/api-docs", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('/');
//   }
  
//   res.sendFile(path.resolve(__dirname, '..', 'start.html'));
// });

module.exports = routes;