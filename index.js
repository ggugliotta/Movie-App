const express = require("express");
const morgan = require(morgan);

const app = express();

let Movies = [
  {
    title: "Pride & Prejudice",
    director: "Joe Wright",
  },
  {
    title: "Where The Heart Is",
    director: "John Boorman",
  },
  {
    title: "The Big Short",
    director: "Adam McKay",
  },
  {
    title: "My Big Fat Greek Wedding",
    director: "Joel Zwick",
  },
  {
    title: "Mulan",
    director: "Tony Bancroft, Barry Cook",
  },
  {
    title: "Selena",
    director: "Gregory Nava",
  },
  {
    title: "The Phantom Menace",
    director: "George Lucas",
  },
  {
    title: "It/s a Wonderful Life",
    director: "Frank Capra",
  },
  {
    title: "Arsenic and Old Lace",
    director: "Frank Capra",
  },
  {
    title: "Steel Magnolias",
    director: "Herbert Ross",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my movie API!");
});

app.get("/movies", (req, res) => {
  res.json(Movies);
  no;
});

// USE requests

app.use(morgan("common"));

app.use("/documentation", express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); //error middleware

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
