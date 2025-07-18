const express = require("express");
const pizzaRouter = express.Router();

const { getAll, getSingle } = require("../controllers/pizza");
const isAuthenticated = require('./middlewareAuth');

pizzaRouter.get("/", isAuthenticated, getAll);
pizzaRouter.get('/:id', isAuthenticated, getSingle);

module.exports = pizzaRouter;