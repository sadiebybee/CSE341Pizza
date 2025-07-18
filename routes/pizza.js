const express = require("express");
const pizzaRouter = express.Router();

const { getAll, getSingle } = require("../controllers/pizza");
const isAuthenticated = require('./middlewareAuth');

const {
  getAll,
  getSingle,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizza");

pizzaRouter.get("/", isAuthenticated, getAll);
pizzaRouter.get("/:id", isAuthenticated, getSingle);
pizzaRouter.post("/", isAuthenticated, createPizza);
pizzaRouter.put("/:id", isAuthenticated, updatePizza);
pizzaRouter.delete("/:id", isAuthenticated, deletePizza);

module.exports = pizzaRouter;