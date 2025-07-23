const express = require('express');
const apiDocs = require('./apiDocs');
const pizzaRouter = require('./pizza');
const router = express.Router();
const myController = require('../controllers/pizza');
const reviewsRouter = require('./reviews');

const isAuthenticated = require('./middlewareAuth');

router.use('/pizza', isAuthenticated, pizzaRouter);
router.use('/reviews', reviewsRouter);
router.use('/api-docs', apiDocs);


module.exports = router;