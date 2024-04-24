const express = require("express"),
  morgan = require("morgan"),
  app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

const { check, validationResult } = require("express-validator");

/**
 * Connection to MongoDB using Mongoose.
 * @type {Object}
 */
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
let allowedOrigins = [
  "http://localhost:8080",
  "https://moviesapi-zy5e.onrender.com",
  "https://flickette.netlify.app",
  "https://ggugliotta.github.io",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

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
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(error);
        res.status(500).send("Error:" + err);
      });
  }
);

//READ (return JSON object [a list] of ALL users to the console when at /users
/* app.get("/users", function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
}); */

//READ (return JSON object [a specific movie title with data including description, genre, ,director, image URL, featured] to the user)
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("No such movie:" + err);
    });
});

//READ a specific movie genre (description by name/title e.g. "Pride & Prejudice")
app.get("/genre/:Name", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.Name })
    .then((movie) => {
      res.status(200).json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("No such genre:" + err);
    });
});

//READ (return JSON object [data about a specific Movie Director including bio, birthday, movies] by name)
app.get("/director/:Name", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.Name })
    .then((movie) => {
      if (movie) {
        return res.status(200).json(movie.Director);
      }
      res.status(400).json("No such director");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("No such director:" + err);
    });
});

//CREATE (New user account, allow users to register)
/* Expect JSON in this format
{
  ID: Integer,
  Name: String,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post(
  "/users",
  // Validation logic here for request
  /*  [
    check("Name", "Name is required"),
    check(
      "Name",
      "Name contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ], */
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let hashedPassword = Users.hashPassword(req.body.Password);
      await Users.findOne({ Username: req.body.Username }).then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Name: req.body.Name,
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error:" + error);
            });
        }
      });
/*     } else {
      return res.status(422).json({ errors: errors.array() });
    }
  } */
);

//UPDATE allows a user to update their info, by username
/* We'll expect JSON in this format
 {
  Name: String (required),
  Username: String (required),
  Password: String (required),
  Email: String (required),
  Birthday: Date
 }*/
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  // Validation logic here for a request
  [
    check("Name", "Name is required").isLength({ min: 5 }),
    check(
      "Name",
      "Name contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // CONDITION ENDS
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Name: req.body.Name,
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { returnDocument: "after" } //returns updated document
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(500).send(req.body.Username + " not found");
        } else {
          res.json(updatedUser);
        }
      })
      .catch((error) => {
        res.status(500).send("Error:" + error);
      });
  }
);

//CREATE (allows users to add movie to user's favoriteMovie list)
app.post("/users/:Username/movies/:MOVIEID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MOVIEID },
    },
    { new: true }
  ) //This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//DELETE (allows users to remove movie from user's favoriteMovie list)
app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  ) //This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//DELETE (allows a user to deregister their account by username)
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + "as not found");
        } else {
          res.status(200).send(req.params.Username + "was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

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
