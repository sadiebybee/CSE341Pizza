const express = require("express");
const userRouter = express.Router();
  
const {
  getAll,
  getSingle,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users");
 
userRouter.get("/",  getAll);
userRouter.get("/:id",  getSingle);
userRouter.post("/",  createUsers);
userRouter.put("/:id",  updateUsers);
userRouter.delete("/:id",  deleteUsers);
 
module.exports = userRouter;