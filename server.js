const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const models = require("./models");
const logger = require("morgan"); //logs HTTP methods

const passport = require("passport");
const session = require('express-session'); //used for local authentication

// Configure body parser for AJAX requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Serve up static assets
app.use(express.static("client/build"));

// Use morgan logger for logging requests
app.use(logger("dev"));

 // For Passport
app.use(session({ secret: 'gators',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport.js')(passport,models.User);

// Add routes, both API and view
const routes = require("./routes")(passport);
app.use('/',routes);


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
//add mongo heroku uri
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/study-smart"
);

// Start the API server
app.listen(PORT, function() {
  console.log("🌎  ==> API Server now listening");
});