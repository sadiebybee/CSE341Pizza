const { client } = require("../db/connection");
const { ObjectId } = require("mongodb");

/***************************** 
 * Validation helper, returns an array of error messages
 ******************************/
function validatePizza(data) {
  const errors = [];

  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required and must be a string");
  }

  if (!data.brand || typeof data.brand !== "string") {
    errors.push("Brand is required and must be a string");
  }

  if (data.description && typeof data.description !== "string") {
    errors.push("Description must be a string");
  }

  if (data.createdDate && isNaN(Date.parse(data.createdDate))) {
    errors.push("createdDate must be a valid date string");
  }

  if (data.updatedDate && isNaN(Date.parse(data.updatedDate))) {
    errors.push("updatedDate must be a valid date string");
  }

  return errors;
}

/***************************** 
 * Get all pizzas
 ******************************/
const getAll = async (req, res, next) => {
  try {
    const pizzas = await client
      .db("pizzaReviewDB")
      .collection("pizzas")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(pizzas);
  } catch (err) {
    console.error("Error getting all pizzas:", err);
    res.status(500).json({ error: "Failed to get pizzas" });
  }
};

/***************************** 
 * Get single pizza by ID
 ******************************/
const getSingle = async (req, res, next) => {
  try {
    const pizzaId = req.params.id;
    if (!ObjectId.isValid(pizzaId)) {
      return res.status(400).json({ message: "Invalid pizza ID" });
    }

    const pizza = await client
      .db("pizzaReviewDB")
      .collection("pizzas")
      .findOne({ _id: new ObjectId(pizzaId) });

    if (!pizza) {
      return res.status(404).json({ message: "Pizza was not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(pizza);
  } catch (err) {
    console.error("Error getting pizza by ID:", err);
    res.status(500).json({ error: "Failed to get the pizza" });
  }
};

/***************************** 
 * Create Pizza
 ******************************/
const createPizza = async (req, res, next) => {
  try {
    const pizza = {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      createdDate: req.body.createdDate,
      updatedDate: req.body.updatedDate,
    };

    const validateErrors = validatePizza(pizza);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    // Convert dates to Date objects if present
    if (pizza.createdDate) pizza.createdDate = new Date(pizza.createdDate);
    else pizza.createdDate = new Date();

    if (pizza.updatedDate) pizza.updatedDate = new Date(pizza.updatedDate);
    else pizza.updatedDate = new Date();

    const result = await client
      .db("pizzaReviewDB")
      .collection("pizzas")
      .insertOne(pizza);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: "Failed to create pizza." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create pizza.", error: error.message });
  }
};

/***************************** 
 * Update Pizza
 ******************************/
const updatePizza = async (req, res, next) => {
  try {
    const pizzaId = req.params.id;
    if (!ObjectId.isValid(pizzaId)) {
      return res.status(400).json({ message: "Invalid pizza ID" });
    }

    const pizza = {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      createdDate: req.body.createdDate,
      updatedDate: req.body.updatedDate,
    };

    const validateErrors = validatePizza(pizza);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    if (pizza.createdDate) pizza.createdDate = new Date(pizza.createdDate);
    if (pizza.updatedDate) pizza.updatedDate = new Date(pizza.updatedDate);

    const collection = client.db("pizzaReviewDB").collection("pizzas");

    const result = await collection.replaceOne({ _id: new ObjectId(pizzaId) }, pizza);

    if (result.modifiedCount > 0) {
      const updatedPizza = await collection.findOne({ _id: new ObjectId(pizzaId) });
      res.status(200).json(updatedPizza); // ✅ Send updated pizza as JSON
    } else {
      res.status(404).json({ message: "Pizza not found or not updated." });
    }
  } catch (error) {
    console.error("Error updating pizza:", error);
    res.status(500).json({ message: "Failed to update pizza.", error: error.message });
  }
};

/***************************** 
 * Delete Pizza
 ******************************/
const deletePizza = async (req, res, next) => {
  try {
    const pizzaId = req.params.id;
    if (!ObjectId.isValid(pizzaId)) {
      return res.status(400).json({ message: "Invalid pizza ID" });
    }

    const result = await client
      .db("pizzaReviewDB")
      .collection("pizzas")
      .deleteOne({ _id: new ObjectId(pizzaId) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Pizza deleted successfully." });
    } else {
      res.status(404).json({ message: "Pizza not found or already deleted." });
    }
  } catch (error) {
    console.error("Error deleting pizza:", error);
    res.status(500).json({ message: "Failed to delete pizza." });
  }
};

module.exports = { getAll, getSingle, createPizza, updatePizza, deletePizza };
