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

// ROUTES

// GET ALL PIZZA

// routes.get('#/default/get_pizza_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/get_pizza_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/get_pizza_'));
// });

routes.get('#/default/post_pizza_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/post_pizza_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/post_pizza_'));
});

routes.get('#/default/get_pizza__id_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/get_pizza__id_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/get_pizza__id_'));
});

routes.get('#/default/put_pizza__id_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/put_pizza__id_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/put_pizza__id_'));
});

routes.get('#/default/delete_pizza__id_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/delete_pizza__id_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/delete_pizza__id_'));
});

// GET ALL REVIEWS

// routes.get('#/default/get_reviews_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/get_reviews_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/get_reviews_'));
// });

routes.get('#/default/post_reviews_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/post_reviews_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/post_reviews_'));
});

routes.get('#/default/get_reviews__id_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/get_reviews__id_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/get_reviews__id_'));
});

routes.get('#/default/put_reviews__id_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/put_reviews__id_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/put_reviews__id_'));
});

routes.get('#/default/delete_reviews__id_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/delete_reviews__id_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/delete_reviews__id_'));
});

// FAVORITES

// GET ALL FAVORITES

// routes.get('#/default/get_favorites_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/get_favorites_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/get_favorites_'));
// });

// POST FAVORITES

// routes.get('#/default/post_favorites_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/post_favorites_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/post_favorites_'));
// });

// GET FAVORITES BY ID

// routes.get('#/default/get_favorites__id_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/get_favorites__id_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/get_favorites__id_'));
// });

// PUT FAVORITES

// routes.get('#/default/put_favorites__id_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/put_favorites__id_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/put_favorites__id_'));
// });

// DELETE FAVORITES

// routes.get('#/default/delete_favorites__id_', (req, res) => {
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//     return res.redirect('#/default/delete_favorites__id_');
//   }

//   res.sendFile(path.resolve(__dirname, '..', '#/default/delete_favorites__id_e'));
// });

routes.get('#/default/get_api_docs_', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('#/default/get_api_docs_');
  }

  res.sendFile(path.resolve(__dirname, '..', '#/default/get_api_docs_'));
});

module.exports = routes;