const express = require('express');
const apiDocs = require('./apiDocs');
const pizzaRouter = require('./pizza');
const router = express.Router();
const myController = require('../controllers/pizza');
const reviewsRouter = require('./reviews');
const favoritesRouter = require('./favorites');

router.use('/pizza', pizzaRouter);
router.use('/reviews', reviewsRouter);
router.use('/favorites', favoritesRouter);
router.use('/api-docs', apiDocs);

module.exports = router;
