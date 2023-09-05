const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      morgan = require("morgan"),
      uuid = require("uuid");

app.use(bodyParser.json());

let Users = [

];

let Movies = [
  {
    "Title": "",
    "Description": "",
    "Genre": {
      "Name": "",
      "Description": ""
    },
    "Director": {
      "Name": "",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
  
];

//Middelware
app.use(morgan("common"));
app.use(express.static("public"));

//All Requests below
// Create Main Server 
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

//READ
app.get("/movies", (req, res) => {
  res.status(200).json(Movies);
});

//READ
app.get("/movies/:title", (req, res) => {
  const {title} = req.params
  const movie = movies.find(movie => movieTitle === title);

  if(movie) {
    res.status(200).json(movie);
  } else {
      res.status(400).send('no such movie')
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
