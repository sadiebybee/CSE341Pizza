const { client } = require('../db/connection');
const { ObjectId } = require('mongodb');

/***************************** 
 Function to get all reviews
******************************/
const getAll = async (req, res) => {
  try {
    // Query the reviews collection in pizzaReviewDB and convert results to an array
    const reviews = await client
      .db('pizzaReviewDB')
      .collection('reviews')
      .find()
      .toArray();
    res.json({ reviews });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};

/***************************** 
 Function to get review by id
******************************/
const getSingle = async (req, res) => {
  // get id from url
  const id = req.params.id;
  // checks if id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const review = await client
    .db('pizzaReviewDB')
    .collection('reviews')
    .findOne({ _id: new ObjectId(id) });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }
  res.json(review);
};

/***************************** 
 Function to create review
******************************/
const create = async (req, res) => {
  // Validate required fields
  if (
    !req.body.userId ||
    !req.body.pizzaId ||
    !req.body.rating ||
    !req.body.commentReview ||
    !req.body.priceRating
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, pizzaId, rating, commentReview, priceRating)',
    });
  }

  // Validate ObjectIds
  if (
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body.pizzaId)
  ) {
    return res.status(400).json({ error: 'Invalid user or pizza ID' });
  }

  // Validate ratings
  if (
    req.body.rating < 1 ||
    req.body.rating > 5 ||
    req.body.priceRating < 1 ||
    req.body.priceRating > 5
  ) {
    return res.status(400).json({ error: 'Ratings must be between 1 and 5' });
  }

  // Creating newReview object
  const newReview = {
    userId: new ObjectId(req.body.userId),
    pizzaId: new ObjectId(req.body.pizzaId),
    rating: Number(req.body.rating),
    commentReview: req.body.commentReview,
    priceRating: Number(req.body.priceRating),
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  // Inserting into database
  const result = await client
    .db('pizzaReviewDB')
    .collection('reviews')
    .insertOne(newReview);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

/***************************** 
 Function to update review
******************************/
const update = async (req, res) => {
  // Validate required fields
  if (
    !req.body.userId ||
    !req.body.pizzaId ||
    !req.body.rating ||
    !req.body.commentReview ||
    !req.body.priceRating
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, pizzaId, rating, commentReview, priceRating)',
    });
  }

  // Gets the id from URL
  const reviewId = req.params.id;

  // Validate ObjectIds
  if (
    !ObjectId.isValid(reviewId) ||
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body.pizzaId)
  ) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Validate ratings
  if (
    req.body.rating < 1 ||
    req.body.rating > 5 ||
    req.body.priceRating < 1 ||
    req.body.priceRating > 5
  ) {
    return res.status(400).json({ error: 'Ratings must be between 1 and 5' });
  }

  // Creating updatedReview object
  const updatedReview = {
    userId: new ObjectId(req.body.userId),
    pizzaId: new ObjectId(req.body.pizzaId),
    rating: Number(req.body.rating),
    commentReview: req.body.commentReview,
    priceRating: Number(req.body.priceRating),
    updatedDate: new Date(),
  };

  // Storing it into database
  const result = await client
    .db('pizzaReviewDB')
    .collection('reviews')
    .updateOne({ _id: new ObjectId(reviewId) }, { $set: updatedReview });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
};

/***************************** 
 Function to delete review
******************************/
const remove = async (req, res) => {
  // Getting reviewId from URL
  const reviewId = req.params.id;

  if (!ObjectId.isValid(reviewId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete review from database
  const result = await client
    .db('pizzaReviewDB')
    .collection('reviews')
    .deleteOne({ _id: new ObjectId(reviewId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
};

module.exports = { getAll, getSingle, create, update, remove };
