const passport = require('passport');
const path = require('path');
const { User, Recipe } = require("../project.js");

const routes = require("express").Router();

// HOME PAGE (Login link)
routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/auth/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHENTICATION ROUTE (After Google OAuth)
routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to /api-docs after successful login
    res.redirect('/api-docs');
  });

// LOG OUT ROUTE
routes.get('/logout', (req, res) => {
  req.logout(() => {
    // After logout, redirect to /logout.html
    res.redirect('/logout.html');
  });
});

// PROTECTED PAGE (API Docs or User Dashboard)
routes.get("/api-docs", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  // Send API documentation page or any other content you want for authenticated users
  res.sendFile(path.resolve(__dirname, '..', 'api-docs.html')); // Adjust the path as needed
});

// LOGGED-IN USER PROFILE PAGE (OPTIONAL)
routes.get("/start.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  // You can serve a specific page or dashboard here
  res.sendFile(path.resolve(__dirname, '..', 'start.html')); // Or redirect to API docs page
});

module.exports = routes;
