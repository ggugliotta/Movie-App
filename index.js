const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27012/gabriellaDB', { 
  useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      morgan = require("morgan"),
      uuid = require("uuid");

app.use(bodyParser.json());

//Middelware
app.use(morgan("common"));
app.use(express.static("public"));

//All Requests below
// Create Main Server 
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

//CREATE (Add a user)
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
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (User) {
        return res.status(400).send (req.body.Username + 'already exists');
      } else {
        Users
          .create ( {
            Name: req.body.Name,
            Username: req.body.Username,
            password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then ((user) => { res.status(201).json(user) })
        .catch ((error) => {
          console.error(error);
          res.status(500).send('Error:' + error);
         })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

 //UPDATE a user's info, by username
 /* We'll expect JSON in this format
 {
  Name: String (required),
  Username: String (required),
  Password: String (required),
  Email: String (required),
  Birthday: Date
 }*/
 app.put("/users/:Username", async (req, res) => {
   await users.findOneAndUpdate ({ Username: req.params.Username 
     }, {$set:
     {
       Username: req.body.Username,
       Password: req.body.Password,
       Email: req.body.Email,
       Birthday: req.body.Birthday
     }
   },
   { new:true }) //returns updated document
   .then ((updatedUser) => {
     res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })

  });
  
 //CREATE (Add movie to user's favoriteMovie list)
 app.post("/users/:id/:movieTitle", async (req, res) => {
    await findOne({movieTitle: req.body.title})
    .then ((title) => {
      if (title) {
        return res.status(201).send(req.body.Title);
      } else {
        res.status(201).json(user)
      }
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error:' + error);
      })
    })

//DELETE movie from user's favoriteMovie list
 app.delete("/movies/:Title", async (req, res) => {
    await Movies.findOneAndRemove({Title: req.params.Title}),
    .then((favoriteMovie.Title) => {
      if(!favoriteMovie.title) {
        res.status(400).sendStatus(req.params.favoriteMovie.Title + ' was not found');
      } else {
        res.status(200).send(req.params.favoriteMovie.Title + 'was deleted');
      }
    }}
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
      });
   });
     

  //DELETE a user by username
 app.delete("/users/:Username", async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username}),
      .then((user) => {
        if (!user) {
          res.status(400).sendStatus(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + 'was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
      });
   });

//READ a list of ALL movies to the user
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((Movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});


//READ a specific movie title
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title})
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('No such movie:' + err);
    });
});

//READ a specific Movie Genre
app.get("/movies/:Genre", async (req, res) => {
  await Movies.findOne({ Title: req.params.Genre})
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('No such genre:' + err);
    });
});


//READ a specific Movie Director
app.get("/movies/:Director", async (req, res) => {
  await Movies.findOne({ Title: req.params.Director.Name})
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('No such director:' + err);
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
