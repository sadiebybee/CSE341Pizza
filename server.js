const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { connectDb } = require("./db/connection");

// Routers
const pizzaRouter = require("./routes/pizza");
const userRouter = require("./routes/users");
const routes = require("./routes");

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Register routes
app.use("/pizza", pizzaRouter);
app.use("/users", userRouter);
app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server after DB connection
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Web Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
