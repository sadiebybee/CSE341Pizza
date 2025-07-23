const request = require('supertest');
const { app } = require('../server');
const { client } = require('../db/connection');

describe('Favorites Routes', () => {
  let createdFavoriteId;

  afterAll(async () => {
    await client.close();
  });

  it('should return all favorites (GET /favorites)', async () => {
    const res = await request(app).get('/favorites');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('favorites');
    expect(Array.isArray(res.body.favorites)).toBe(true);
  });

  it('should create a new favorite (POST /favorites)', async () => {
    const newFavorite = {
      userId: '60d5f9d6f9a1b44b0c8f9b4e',
      pizzaId: '60d5f9d6f9a1b44b0c8f9b4f',
      reviewId: '60d5f9d6f9a1b44b0c8f9b50',
    };

    const res = await request(app)
      .post('/favorites')
      .send(newFavorite)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdFavoriteId = res.body.id;
  });

  it('should return 400 for invalid favorite data (POST /favorites)', async () => {
    const res = await request(app)
      .post('/favorites')
      .send({})
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(400);
  });

  it('should get a single favorite by ID (GET /favorites/:id)', async () => {
    const res = await request(app).get(`/favorites/${createdFavoriteId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdFavoriteId);
  });

  it('should return 400 for invalid favorite ID (GET /favorites/:id)', async () => {
    const res = await request(app).get('/favorites/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  it('should update a favorite (PUT /favorites/:id)', async () => {
    const res = await request(app)
      .put(`/favorites/${createdFavoriteId}`)
      .send({
        userId: '60d5f9d6f9a1b44b0c8f9b4e',
        pizzaId: '60d5f9d6f9a1b44b0c8f9b4f',
        reviewId: '60d5f9d6f9a1b44b0c8f9b50',
      });

    expect(res.statusCode).toBe(204);
  });

  it('should return 400 for invalid favorite ID on update (PUT /favorites/:id)', async () => {
    const res = await request(app)
      .put('/favorites/invalid-id')
      .send({ userId: 'bad' });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for invalid favorite data on update (PUT /favorites/:id)', async () => {
    const res = await request(app)
      .put(`/favorites/${createdFavoriteId}`)
      .send({ userId: '' });

    expect(res.statusCode).toBe(400);
  });

  it('should delete a favorite (DELETE /favorites/:id)', async () => {
    const res = await request(app).delete(`/favorites/${createdFavoriteId}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 400 for invalid favorite ID on delete (DELETE /favorites/:id)', async () => {
    const res = await request(app).delete('/favorites/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
