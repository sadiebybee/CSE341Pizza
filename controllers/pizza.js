const express = require("express");
const { connectDb } = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const db = await connectDb();
    const list = await db.collection("pizzas").find().toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list);
  } catch (err) {
    console.error("Error getting all pizzas:", err);
    res.status(500).json({ error: "Failed to get pizzas" });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const db = await connectDb();
    const pizzaId = new ObjectId(req.params.id);
    const list = await db.collection("pizzas").find({ _id: pizzaId }).toArray();

    if (!list[0]) {
      return res.status(404).json({ message: "Pizza was not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(list[0]);
  } catch (err) {
    console.error("Error getting pizza by ID:", err);
    res.status(500).json({ error: "Failed to get the pizza" });
  }
};

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

    const result = await mongodb
      .getDb()
      .db("pizzas")
      .collection("mainPizzas")
      .insertOne(pizza);
    if (result.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create pizza." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create pizza.", error: error.message });
  }
};

const updatePizza = async (req, res, next) => {
  try {
    const pizzaId = new ObjectId(req.params.id);
    const pizza = {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      createdDate: req.body.createdDate,
      updatedDate: req.body.updatedDate,
    };

    const validateErrors = validateExpense(pizza);
    if (validateErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Errors",
        errors: validateErrors,
      });
    }

    const result = await mongodb
      .getDb()
      .db("pizzas")
      .collection("mainPizzas")
      .replaceOne({ _id: pizzaId }, pizza);
    if (result.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json({ message: "Failed to update pizza." });
    }
  } catch {
    res.status(500).json({ message: "Failed to update pizza." });
  }
};

const deletePizza = async (req, res, next) => {
  try {
    const pizzaId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("pizzas")
      .collection("mainPizzas")
      .deleteOne({ _id: pizzaId });

    if (result.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Failed to delete pizza." });
    }
  } catch {
    res.status(500).json({ message: "Failed to delete pizza." });
  }
};

module.exports = { getAll, getSingle, createPizza, updatePizza, deletePizza };
