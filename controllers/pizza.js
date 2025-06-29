const express = require('express');
const { connectDb } = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const db = await connectDb();
    const list = await db.collection('pizzas').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
  } catch (err) {
    console.error('Error getting all pizzas:', err);
    res.status(500).json({ error: 'Failed to get pizzas' });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const db = await connectDb();
    const pizzaId = new ObjectId(req.params.id);
    const list = await db.collection('pizzas').find({ _id: pizzaId }).toArray();

    if (!list[0]) {
      return res.status(404).json({ message: 'Pizza was not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list[0]);
  } catch (err) {
    console.error('Error getting pizza by ID:', err);
    res.status(500).json({ error: 'Failed to get the pizza' });
  }
};

module.exports = { getAll, getSingle };
