const { client } = require("../db/connection");
const { ObjectId } = require("mongodb");

/***************************** 
 * Get all Users
 ******************************/
const getAll = async (req, res, next) => {
  try {
    const users = await client
      .db("usersDB")
      .collection("users")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error getting all users:", err);
    res.status(500).json({ error: "Failed to get users" });
  }
};

/***************************** 
 * Get single user by ID
 ******************************/
const getSingle = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await client
      .db("usersDB")
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User was not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (err) {
    console.error("Error getting user by ID:", err);
    res.status(500).json({ error: "Failed to get the user" });
  }
};

/***************************** 
 * Create User
 ******************************/
const createUsers = async (req, res, next) => {
  try {
    const user = {
      userId: req.body.userId,
      username: req.body.username,
      email: req.body.email,
      createdDate: req.body.createdDate ? new Date(req.body.createdDate) : new Date(),
      updatedDate: req.body.updatedDate ? new Date(req.body.updatedDate) : new Date(),
    };

    const validateErrors = validateUsers(user);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    const result = await client
      .db("usersDB")
      .collection("users")
      .insertOne(user);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: "Failed to create user." });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user.", error: error.message });
  }
};

/***************************** 
 * Update User
 ******************************/
const updateUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = {
      userId: req.body.userId,
      username: req.body.username,
      email: req.body.email,
      updatedDate: req.body.updatedDate ? new Date(req.body.updatedDate) : new Date(),
    };

    const validateErrors = validateUsers(user);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    const collection = client.db("usersDB").collection("users");

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: user }
    );

    if (result.modifiedCount > 0) {
      const updatedUser = await collection.findOne({ _id: new ObjectId(userId) });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found or not updated." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user.", error: error.message });
  }
};

/***************************** 
 * Delete User
 ******************************/
const deleteUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await client
      .db("usersDB")
      .collection("users")
      .deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ message: "User not found or already deleted." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

module.exports = { getAll, getSingle, createUsers, updateUsers, deleteUsers };
