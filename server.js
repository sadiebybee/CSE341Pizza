const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./db/connect");
const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
app.use('/', require ('./routes'))

// server starts when db is connected
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Web Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
