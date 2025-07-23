const express = require('express');

const passport = require('passport');

const path = require('path');

const routes = express.Router();


routes.get('/', (req, res) => {
  res.send(`<a href="/auth/google">Login with Google</a>`);
});

routes.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs');
});


routes.get('/api-docs', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.sendFile(path.resolve(__dirname, '..', '/api-docs'));
});

module.exports = routes;