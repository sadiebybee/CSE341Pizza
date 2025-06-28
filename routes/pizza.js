const express = require("express");
const pizzaRouter = express.Router();

const { getAll, getSingle } = require("../controllers/pizza");

pizzaRouter.get("/", getAll);
pizzaRouter.get("/:id", getSingle);

module.exports = pizzaRouter;
