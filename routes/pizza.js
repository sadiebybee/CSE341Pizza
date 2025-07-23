const express = require("express");
const pizzaRouter = express.Router();

// const { getAll, getSingle } = require("../controllers/pizza");
// const isAuthenticated = require('./middlewareAuth');

const {
  getAll,
  getSingle,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizza");

pizzaRouter.get("/", getAll);
pizzaRouter.get("/:id", getSingle);
pizzaRouter.post("/", createPizza);
pizzaRouter.put("/:id", updatePizza);
pizzaRouter.delete("/:id", deletePizza);

module.exports = pizzaRouter;