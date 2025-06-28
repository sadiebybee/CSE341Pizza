const express = require('express')
const apiDocs = require('./apiDocs');
const pizzaRouter = require('./pizza');
const router = express.Router();
const myController = require('../controllers/pizza');

router.use("/pizza", pizzaRouter);
router.use("/api-docs", apiDocs);

module.exports = router;
