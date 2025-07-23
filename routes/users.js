const express = require("express");
const userRouter = express.Router();

// const { getAll, getSingle } = require("../controllers/pizza");
const isAuthenticated = require('./middlewareAuth');

const {
  getAll,
  getSingle,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users");

userRouter.get("/", isAuthenticated, getAll);
userRouter.get("/:id", isAuthenticated, getSingle);
userRouter.post("/", isAuthenticated, createUsers);
userRouter.put("/:id", isAuthenticated, updateUsers);
userRouter.delete("/:id", isAuthenticated, deleteUsers);

module.exports = userRouter;