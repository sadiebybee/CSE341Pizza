const passport = require('passport');
const path = require('path');
const { User, Recipe } = require("../project.js");

const routes = require("express").Router();

// STARTS HERE TO LOGIN
routes.get("/", async (req, res) => {
  res.send(`<a href="/api-docs">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/auth", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHENTICATION ROUTE 
routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs');
  });

// LOG OUT ROUTE
routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// // PROTECTED PAGE (API Docs or User Dashboard)
// routes.get("/api-docs", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('/');
//   }
  
//   // Send API documentation page or any other content you want for authenticated users
//   res.sendFile(path.resolve(__dirname, '..', 'api-docs.html')); 
// });

module.exports = routes;
