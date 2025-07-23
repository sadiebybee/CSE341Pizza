const request = require('supertest');
const { app } = require('../server');
const { client } = require('../db/connection');

describe('Pizza Routes', () => {
  let createdPizzaId;

  it('should return all pizzas (GET /pizza)', async () => {
    const res = await request(app).get('/pizza');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new pizza (POST /pizza)', async () => {
    const newPizza = {
      name: 'Test Pizza',
      brand: 'Test Brand',
    };

    const res = await request(app)
      .post('/pizza')
      .send(newPizza)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdPizzaId = res.body._id;
  });

  it('should return 400 for invalid pizza data (POST /pizza)', async () => {
    const res = await request(app)
      .post('/pizza')
      .send({})
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(400);
  });

  it('should get a single pizza by ID (GET /pizza/:id)', async () => {
    const res = await request(app).get(`/pizza/${createdPizzaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdPizzaId);
  });

  it('should return 400 for invalid pizza ID (GET /pizza/:id)', async () => {
    const res = await request(app).get('/pizza/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  it('should update a pizza (PUT /pizza/:id)', async () => {
    const res = await request(app)
      .put(`/pizza/${createdPizzaId}`)
      .send({ name: 'Updated Pizza', brand: 'Updated Brand' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated Pizza');
  });

  it('should return 400 for invalid pizza ID on update (PUT /pizza/:id)', async () => {
    const res = await request(app)
      .put('/pizza/invalid-id')
      .send({ name: 'Bad' });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for invalid pizza data on update (PUT /pizza/:id)', async () => {
    const res = await request(app)
      .put(`/pizza/${createdPizzaId}`)
      .send({ name: 123 });

    expect(res.statusCode).toBe(400);
  });

  it('should delete a pizza (DELETE /pizza/:id)', async () => {
    const res = await request(app).delete(`/pizza/${createdPizzaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Pizza deleted successfully.');
  });

  it('should return 400 for invalid pizza ID on delete (DELETE /pizza/:id)', async () => {
    const res = await request(app).delete('/pizza/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await client.close();
});
