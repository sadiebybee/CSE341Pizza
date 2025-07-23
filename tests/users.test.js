const request = require("supertest");
const { app } = require("../server");
const { client } = require("../db/connection");
// const { ObjectId } = require("mongodb");

let testUserId;

beforeAll(async () => {
  await client.connect();
});

afterAll(async () => {
  await client.db("userDB").collection("users").deleteMany({ username: "testuser" });
  await client.close();
});

describe("User API Endpoints", () => {

  test("POST /users - create user", async () => {
    const newUser = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      username: "testuser",
      password: "password123",
      createdDate: new Date(),
      updatedDate: new Date()
    };

    const res = await request(app)
      .post("/users")
      .send(newUser)
      .expect(201);

    expect(res.body.insertedId).toBeDefined();
    testUserId = res.body.insertedId;
  });

  test("GET /users - get all users", async () => {
    const res = await request(app).get("/users").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /users/:id - get single user", async () => {
    const res = await request(app).get(`/users/${testUserId}`).expect(200);
    expect(res.body.username).toBe("testuser");
  });

  test("PUT /users/:id - update user", async () => {
    const updatedUser = {
      firstName: "Updated",
      lastName: "User",
      email: "updateduser@example.com",
      username: "testuser",
      password: "newpass123",
      createdDate: new Date(),
      updatedDate: new Date()
    };

    const res = await request(app)
      .put(`/users/${testUserId}`)
      .send(updatedUser)
      .expect(200);

    expect(res.body.firstName).toBe("Updated");
    expect(res.body.email).toBe("updateduser@example.com");
  });

  test("DELETE /users/:id - delete user", async () => {
    const res = await request(app)
      .delete(`/users/${testUserId}`)
      .expect(200);

    expect(res.body.message).toBe("User deleted successfully.");
  });

  test("GET /users/:id - invalid ID", async () => {
    const res = await request(app)
      .get("/users/invalid-id")
      .expect(400);

    expect(res.body.message).toBe("Invalid user ID");
  });
});
