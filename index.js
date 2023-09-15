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

mongoose.connect('mongodb://localhost:27017/gabriellaDB', { 
  useNewUrlParser: true, useUnifiedTopology: true });

//Middelware
app.use(morgan("common"));
app.use(express.static("public"));

//All Endpoint Requests below
// CREATE (default text response when at Main Server /)
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

//READ (return JSON object [a list] of ALL movies to the user when at /movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});

//READ (return JSON object [a list] of ALL users to the console when at /users 
 app.get("/users", function (req, res) {
  Users.find()
    .then(function (users) {
       res.status(201).json(users);
     })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});

//READ (return JSON object [a specific movie title with data including description, genre, ,director, image URL, featured] to the user)
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title})
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
  await Movies.findOne({ 'Genre.Name': req.params.Name})
    .then((movie) => {
      res.status(200).json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('No such genre:' + err);
    });
});


// //READ (return JSON object [data about a specific Movie Director including bio, birthday, movies] by name)
app.get("/director/:Name", async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.Name})
    .then((movie) => {
      if (movie) {
        return res.status(200).json(movie.Director);
    }
    res.status(400).json('No such director');
  })
  .catch((err) => {
    console.error(err);
      res.status(500).send('No such director:' + err);
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
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send (req.body.Name + "already exists");
      } else {
        Users.create ({
            Name: req.body.Name,
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then ((user) => { 
            res.status(201).json(user);
          })
          .catch ((error) => {
            console.error(error);
            res.status(500).send("Error:" + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

 //UPDATE allows a user to update their info, by username
 /* We'll expect JSON in this format
 {
  Name: String (required),
  Username: String (required),
  Password: String (required),
  Email: String (required),
  Birthday: Date
 }*/
 app.put("/users/:Username", async (req, res) => {
   await Users.findOneAndUpdate (
    { Username: req.params.Username },
    {
     $set: {
       Name: req.body.Name,
       Username: req.body.Username,
       Password: req.body.Password,
       Email: req.body.Email,
       Birthday: req.body.Birthday
     },
   },
   { returnDocument: "after"} //returns updated document
   ).then(updatedUser => {
    if (!updatedUser) {
      return res.status(500).send(req.body.Username + ' not found');
    } else {
      res.json(updatedUser);
    }
  }).catch(error => {
    res.status(500).send("Error:" + error);
  })
 });
  
 //CREATE (allows users to add movie to user's favoriteMovie list)
 app.post('/users/:Username/movies/:MOVIEID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.body.Username }, {
     $push: { FavoriteMovies: req.params.MOVIEID }
    },
    { new: true }) //This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

//DELETE (allows users to remove movie from user's favoriteMovie list)
 app.delete("/users/:Username/movies/MovieID", async (req, res) => {
    await Users.findOneAndRemove({Username: req.params.Username}, {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }) //This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
 });


  //DELETE (allows a user to deregister their account by username)
 app.delete("/users/:Username", async (req, res) => {
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
   });

//Error Request
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); //error middleware

//Listen Request
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
