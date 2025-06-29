const express = require("express");
const { connectDb } = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("pizzaReviewDB")
    .collection("pizzas")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const pizzaId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("pizzaReviewDB")
    .collection("pizzas")
    .find({ _id: pizzaId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAll, getSingle };
