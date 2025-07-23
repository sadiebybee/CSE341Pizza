const request = require('supertest');
const { app } = require('../server');
const { client } = require('../db/connection');

describe('Reviews Routes', () => {
  let createdReviewId;

  afterAll(async () => {
    await client.close();
  });

  it('should return all reviews (GET /reviews)', async () => {
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('reviews');
    expect(Array.isArray(res.body.reviews)).toBe(true);
  });

  it('should create a new review (POST /reviews)', async () => {
    const newReview = {
      userId: '60d5f9d6f9a1b44b0c8f9b4e',
      pizzaId: '60d5f9d6f9a1b44b0c8f9b4f',
      rating: 4,
      commentReview: 'Great pizza!',
      priceRating: 3,
    };

    const res = await request(app)
      .post('/reviews')
      .send(newReview)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdReviewId = res.body.id;
  });

  it('should return 400 for invalid review data (POST /reviews)', async () => {
    const res = await request(app)
      .post('/reviews')
      .send({})
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(400);
  });

  it('should get a single review by ID (GET /reviews/:id)', async () => {
    const res = await request(app).get(`/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdReviewId);
  });

  it('should return 400 for invalid review ID (GET /reviews/:id)', async () => {
    const res = await request(app).get('/reviews/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  it('should update a review (PUT /reviews/:id)', async () => {
    const res = await request(app)
      .put(`/reviews/${createdReviewId}`)
      .send({
        userId: '60d5f9d6f9a1b44b0c8f9b4e',
        pizzaId: '60d5f9d6f9a1b44b0c8f9b4f',
        rating: 5,
        commentReview: 'Updated review comment',
        priceRating: 4,
      });

    expect(res.statusCode).toBe(204);
  });

  it('should return 400 for invalid review ID on update (PUT /reviews/:id)', async () => {
    const res = await request(app)
      .put('/reviews/invalid-id')
      .send({ rating: 5 });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for invalid review data on update (PUT /reviews/:id)', async () => {
    const res = await request(app)
      .put(`/reviews/${createdReviewId}`)
      .send({ userId: 'bad' });

    expect(res.statusCode).toBe(400);
  });

  it('should delete a review (DELETE /reviews/:id)', async () => {
    const res = await request(app).delete(`/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 400 for invalid review ID on delete (DELETE /reviews/:id)', async () => {
    const res = await request(app).delete('/reviews/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
