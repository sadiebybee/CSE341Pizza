const express = require('express');
const favoritesRouter = express.Router();
const isAuthenticated = require('./middlewareAuth');
const passport = require('passport');

const {
  getAll,
  getSingle,
  create,
  update,
  remove,
} = require('../controllers/favorites');
// const { verifyToken } = require("../validators/reviewValidator");

favoritesRouter.get('/', isAuthenticated, getAll);
favoritesRouter.get('/:id', isAuthenticated, getSingle);
favoritesRouter.post('/', isAuthenticated, create);
favoritesRouter.put('/:id', isAuthenticated, update);
favoritesRouter.delete('/:id', isAuthenticated, remove);

module.exports = favoritesRouter;
