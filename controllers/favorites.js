const { client } = require('../db/connection');
const { ObjectId } = require('mongodb');

/***************************** 
 Function to get all favorites
******************************/
const getAll = async (req, res) => {
  try {
    // Query the favorites collection in pizzaReviewDB and convert results to an array
    const favorites = await client
      .db('pizzaReviewDB')
      .collection('favorites')
      .find()
      .toArray();
    res.json({ favorites });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};

/***************************** 
 Function to get favorites by id
******************************/
const getSingle = async (req, res) => {
  // get id from url
  const id = req.params.id;
  // checks if id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const favorite = await client
    .db('pizzaReviewDB')
    .collection('favorites')
    .findOne({ _id: new ObjectId(id) });

  if (!favorite) {
    return res.status(404).json({ error: 'Favorite pizza not found' });
  }
  res.json(favorite);
};

/***************************** 
 Function to create favorite pizza
******************************/
const create = async (req, res) => {
  // Validate required fields
  if (!req.body.userId || !req.body.pizzaId || !req.body.reviewId) {
    return res.status(400).json({
      error: 'All fields are required: (userId, pizzaId, reviewId)',
    });
  }

  // Validate ObjectIds
  if (
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body.pizzaId) ||
    !ObjectId.isValid(req.body.reviewId)
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid user, pizza ID, or review ID' });
  }

  // Creating newFavorite object
  const newFavorite = {
    userId: new ObjectId(req.body.userId),
    pizzaId: new ObjectId(req.body.pizzaId),
    reviewId: new ObjectId(req.body.reviewId),
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  // Inserting into database
  const result = await client
    .db('pizzaReviewDB')
    .collection('favorites')
    .insertOne(newFavorite);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json({ error: 'Failed to create favorite pizza' });
  }
};

/***************************** 
 Function to update favotire pizza
******************************/
const update = async (req, res) => {
  // Validate required fields
  if (!req.body.userId || !req.body.pizzaId || !req.body.reviewId) {
    return res.status(400).json({
      error: 'All fields are required: (userId, pizzaId, reviewId)',
    });
  }

  // Gets the id from URL
  const favoriteId = req.params.id;

  // Validate ObjectIds
  if (
    !ObjectId.isValid(favoriteId) ||
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body.pizzaId) ||
    !ObjectId.isValid(req.body.reviewId)
  ) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Creating updatedFavorite object
  const updatedFavorite = {
    userId: new ObjectId(req.body.userId),
    pizzaId: new ObjectId(req.body.pizzaId),
    reviewId: new ObjectId(req.body.reviewId),
    updatedDate: new Date(),
  };

  // Storing it into database
  const result = await client
    .db('pizzaReviewDB')
    .collection('favorites')
    .updateOne({ _id: new ObjectId(favoriteId) }, { $set: updatedFavorite });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Favorite pizza not found' });
  }
};

/***************************** 
 Function to delete favorite
******************************/
const remove = async (req, res) => {
  // Getting favoriteId from URL
  const favoriteId = req.params.id;

  if (!ObjectId.isValid(favoriteId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete favorite from database
  const result = await client
    .db('pizzaReviewDB')
    .collection('favorites')
    .deleteOne({ _id: new ObjectId(favoriteId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Favorite pizza not found' });
  }
};

module.exports = { getAll, getSingle, create, update, remove };
