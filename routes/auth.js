const passport = require('passport');

const path = require('path');

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/auth", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHICATION ROUTE
routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs');
});

module.exports = routes;