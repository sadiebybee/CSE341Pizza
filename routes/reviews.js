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

reviewsRouter.get('/', getAll);
reviewsRouter.get('/:id', getSingle);
reviewsRouter.post('/',  create);
reviewsRouter.put('/:id', update);
reviewsRouter.delete('/:id', remove);

module.exports = reviewsRouter;