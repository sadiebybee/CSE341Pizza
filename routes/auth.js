const passport = require('passport');

const path = require('path');

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/api-docs">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/auth", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHICATION ROUTE
routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
});

// PROFILE
routes.get('/api-docs', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  //LOG INTO
  res.redirect('/api-docs');
});


routes.get("/api-docs", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
});

module.exports = routes;