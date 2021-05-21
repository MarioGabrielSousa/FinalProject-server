require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

//Include passport configuration
require("./configs/passport");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
const app = express();

app.set("trust proxy", 1);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: true, //the requester is on the same domain
      secure: false, //not using https
      httpOnly: true, //site on only on http
      maxAge: 3600000, //coolie time to live
    },

    /* 
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    sameSite: true, //the requester is on the same domain
    secure: false, //not using https
    httpOnly: true, //site on only on http
    maxAge: 600000 //coolie time to live
  }, */
    rolling: true, //session gets refreshed
  })
);
//Initializes passport
app.use(passport.initialize());
//Initializes passport session
app.use(passport.session());
//Allowing our frontend to get
//resources from our backend (API)
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_HOSTNAME],
  })
);
const index = require("./routes/index");
app.use("/", index);
const workoutRoutes = require("./routes/workout-routes");
app.use("/api", workoutRoutes);
const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

module.exports = app;
