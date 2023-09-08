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

//CREATE New Users
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
      res.status(400).send("users need names")
  }
 })

 //Update User ID
 app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

     let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user)
    } else {
        res.status(400).send("no such user")
    }
 })

 //CREATE (Add movie to favorites list)
 app.post("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

     let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovie.push(movieTitle);
        res.status(200).send( `${movieTitle} has been added to ${ id }'s array`);;
    } else {
        res.status(400).send("no such user")
    }
 })

//DELETE
 app.delete("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

     let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovie = user.favoriteMovie.filter(title => title != movieTitle);
        res.status(200).send('${movieTitle} has been removed from user ${id}/s array');
    } else {
        res.status(400).send("no such user")
    }
 })

  //DELETE
 app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

     let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send('user ${id} has been deleted');
    } else {
        res.status(400).send("no such user")
    }
 })

//READ (Return a list of ALL movies to the user)
app.get("/movies", (req, res) => {
  res.status(200).json(Movies);
});

//READ Movie Information 
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
      res.status(200).json(movie)
  } else {
      res.status(400).send("no such movie")
  }
});

//READ Movie Genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
      res.status(200).json(genre)
  } else {
      res.status(400).send("no such genre")
  }
});

//READ Movie Directors
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  if (director) {
      res.status(200).json(director)
  } else {
      res.status(400).send("no such director")
  }
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
