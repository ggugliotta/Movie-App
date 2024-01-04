const express = require("express"),
  morgan = require("morgan"),
  app = express()
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  uuid = require("uuid");

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const { check, validationResult } = require("express-validator");

/**
 * Connection to MongoDB using Mongoose.
 * @type {Object}
 */
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/**
 * Middleware for logging HTTP requests.
 * @function
 * @param {string} "common" - Morgan logging format.
 */
app.use(morgan("common"));

/**
 * Middleware to serve static files from the "public" directory.
 * @function
 * @param {string} "public" - The directory to serve static files from.
 */
app.use(express.static("public"));

/**
 * Middleware for enabling CORS with specified allowed origins.
 * @function
 * @param {Object} corsOptions - CORS configuration object.
 */
const cors = require("cors");
let allowedOrigins = ['http://localhost:8080', 'https://moviesapi-zy5e.onrender.com',
  'http://localhost:1234', 'https://flickette.netlify.app', 'https://localhost:4200'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

/**
 * Authentication module setup.
 * @type {Object}
 */
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

/**
 * Express endpoint for the root route.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

/**
 * Express endpoint to get a list of all movies.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/movies", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Implementation to retrieve and send a list of all movies
});

// Additional endpoint comments follow for other routes...

/**
 * Express endpoint to serve as an error handler middleware.
 * @function
 * @param {Object} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); //error middleware

/**
 * Express server listens on a specified port.
 * @const
 * @type {number} port - Port number to listen on.
 */
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});

