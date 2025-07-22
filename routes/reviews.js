const express = require('express');
const reviewsRouter = express.Router();
const {
  getAll,
  getSingle,
  create,
  update,
  remove,
} = require('../controllers/reviews');
// const { verifyToken } = require("../validators/reviewValidator");
const isAuthenticated = require('./middlewareAuth');

reviewsRouter.get('/', isAuthenticated, getAll);
reviewsRouter.get('/:id', isAuthenticated, getSingle);
reviewsRouter.post('/', isAuthenticated, create);
reviewsRouter.put('/:id', isAuthenticated, update);
reviewsRouter.delete('/:id', isAuthenticated, remove);

module.exports = reviewsRouter;