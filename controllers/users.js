const { ObjectId } = require("mongodb");
const { client } = require("../db/connection");

/*****************************
 * Validator Function
 ******************************/
function validateUsers(user) {
  const errors = [];
  if (!user.username || user.username.length < 2) {
    errors.push("Username is required and must be at least 2 characters.");
  }
  if (!user.email || !user.email.includes("@")) {
    errors.push("Valid email is required.");
  }
  return errors;
}

/*****************************
 * GET All Users
 ******************************/
const getAll = async (req, res, next) => {
  try {
    const result = await client
      .db("userDB")
      .collection("users")
      .find()
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Failed to retrieve users." });
  }
};

/*****************************
 * GET Single User by ID
 ******************************/
const getSingle = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await client
      .db("userDB")
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Failed to retrieve user." });
  }
};

/*****************************
 * Create User
 ******************************/
const createUsers = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      createdDate: req.body.createdDate,
      updatedDate: req.body.updatedDate,
    };

    const validateErrors = validateUsers(user);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    if (user.createdDate) user.createdDate = new Date(user.createdDate);
    if (user.updatedDate) user.updatedDate = new Date(user.updatedDate);

    const result = await client
      .db("userDB")
      .collection("users")
      .insertOne(user);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Failed to create user.", error: error.message });
  }
};

/*****************************
 * Update Users
 ******************************/
const updateUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const users = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      createdDate: req.body.createdDate,
      updatedDate: req.body.updatedDate,
    };

    const validateErrors = validateUsers(users);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    if (users.createdDate) users.createdDate = new Date(users.createdDate);
    if (users.updatedDate) users.updatedDate = new Date(users.updatedDate);

    const collection = client.db("userDB").collection("users");

    const result = await collection.replaceOne(
      { _id: new ObjectId(userId) },
      users
    );

    if (result.modifiedCount > 0) {
      const updatedUsers = await collection.findOne({
        _id: new ObjectId(userId),
      });
      res.status(200).json(updatedUsers);
    } else {
      res.status(404).json({ message: "User not found or not updated." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Failed to update user.", error: error.message });
  }
};

/*****************************
 * Delete Users
 ******************************/
const deleteUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await client
      .db("userDB")
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

module.exports = {
  getAll,
  getSingle,
  createUsers,
  updateUsers,
  deleteUsers,
};
