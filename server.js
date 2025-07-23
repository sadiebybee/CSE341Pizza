var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
const { connectDb } = require("./db/connection");
const routes = require("./routes");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./config/google_auth.js');


app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));
app.use("/", routes);

app.use(passport.initialize());
app.use(passport.session()); 

const projectsRouter = require('./routes/auth.js')
app.use('/', projectsRouter);

// server starts when db is connected
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


const pizzaRouter = require('./routes/pizza');
app.use('/pizza', pizzaRouter);
