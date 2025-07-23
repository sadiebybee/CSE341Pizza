const express = require('express');
const reviewsRouter = express.Router();
const isAuthenticated = require('./middlewareAuth');
const passport = require('passport');
const {
  getAll,
  getSingle,
  create,
  update,
  remove,
} = require('../controllers/reviews');
// const { verifyToken } = require("../validators/reviewValidator");

reviewsRouter.get('/', isAuthenticated, getAll);
reviewsRouter.get('/:id', isAuthenticated, getSingle);
reviewsRouter.post('/', isAuthenticated, create);
reviewsRouter.put('/:id', isAuthenticated, update);
reviewsRouter.delete('/:id', remove);

module.exports = reviewsRouter;