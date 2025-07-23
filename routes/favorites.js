const express = require('express');
const favoritesRouter = express.Router();

const {
  getAll,
  getSingle,
  create,
  update,
  remove,
} = require('../controllers/favorites');
// const { verifyToken } = require("../validators/reviewValidator");

favoritesRouter.get('/',  getAll);
favoritesRouter.get('/:id', getSingle);
favoritesRouter.post('/',  create);
favoritesRouter.put('/:id', update);
favoritesRouter.delete('/:id', remove);

module.exports = favoritesRouter;
