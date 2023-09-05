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
    "Title": "Pride & Prejudice",
    "Description": "Pride & Prejudice is a 2005 romantic drama film directed by Joe Wright, in his feature directorial debut, and based on Jane Austen's 1813 novel of the same name. The film features five sisters from an English family of landed gentry as they deal with issues of marriage, morality and misconceptions.",
    "Genre": {
      "Name": "Romantic Drama",
      "Description": ""
    },
    "Director": {
      "Name": "Joe Wright",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  },
    {
    "Title": "Where the Heart Is",
    "Description": "Where the Heart Is is a 2000 American romantic drama film. The screenplay, written by Lowell Ganz and Babaloo Mandel, is based on the best-selling 1995 novel of the same name by Billie Letts. The film follows five years in the life of Novalee Nation, a pregnant 17-year-old who is abandoned by her boyfriend at a Walmart in a small Oklahoma town. She secretly moves into the store, where she eventually gives birth to her baby, which attracts media attention. With the help of friends, she makes a new life for herself in the town.",
    "Genre": {
      "Name": "Romantic Drama",
      "Description": ""
    },
    "Director": {
      "Name": "Matt Williams",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "The Big Short",
    "Description": "The Big Short is a 2015 American biographical crime comedy-drama film.. It is based on the 2010 book The Big Short: Inside the Doomsday Machine by Michael Lewis showing how the 2007–2008 financial crisis was triggered by the United States housing bubble.",
    "Genre": {
      "Name": "Comedy Drama",
      "Description": ""
    },
    "Director": {
      "Name": "Adam McKay",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "My Big Fat Greek Wedding",
    "Description": "My Big Fat Greek Wedding is a 2002 romantic comedy film written by Nia Vardalos. It follows a young Greek-American woman who falls in love with a non-Greek and struggles to get her family to accept him while she comes to terms with her heritage and cultural identity.",
    "Genre": {
      "Name": "Comedy Drama",
      "Description": ""
    },
    "Director": {
      "Name": "Joel Zwick",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "Mulan",
    "Description": "Mulan is a 1998 American animated musical adventure film produced by Walt Disney Feature Animation for Walt Disney Pictures. Based on the Chinese legend of Hua Mulan, it is the 36th Disney animated feature film, and the ninth animated feature film produced and released during the Disney Renaissance. The film's plot takes place in China during an unspecified Imperial dynasty, where Fa Mulan, daughter of aged warrior Fa Zhou, impersonates a man to take her father's place during a general conscription to counter a Hun invasion.",
    "Genre": {
      "Name": "",
      "Description": ""
    },
    "Director": {
      "Name": "Tony Bancroft",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "Selena",
    "Description": "Selena is a 1997 American biographical musical drama film. It is based on the true story of Tejano music star Selena Quintanilla-Pérez, chronicling her rise to fame and death when she was murdered by Yolanda Saldívar at the age of 23.",
    "Genre": {
      "Name": "Drama",
      "Description": ""
    },
    "Director": {
      "Name": "Gregory Nava",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "The Phantom Menace",
    "Description": "Star Wars: Episode I The Phantom Menace is a 1999 American epic space opera film. It is the fourth film in the Star Wars film series, the first film of the prequel trilogy and the first chronological chapter of the Skywalker Saga. Set 32 years before the original trilogy, (13 years before the formation of the Galactic Empire), during the era of the Galactic Republic, the plot follows Jedi Master Qui-Gon Jinn and his apprentice Obi-Wan Kenobi as they try to protect Queen Padmé Amidala of Naboo in hopes of securing a peaceful end to an interplanetary trade dispute. Joined by Anakin Skywalker—a young slave with unusually strong natural powers of the Force—they simultaneously contend with the mysterious return of the Sith.",
    "Genre": {
      "Name": "Space Opera",
      "Description": ""
    },
    "Director": {
      "Name": 
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "It/s a Wonderful Life",
    "Description": "It/s a Wonderful Life is a 1946 American Christmas supernatural drama film. It is based on the short story and booklet The Greatest Gift self-published by Philip Van Doren Stern in 1943, which itself is loosely based on the 1843 Charles Dickens novella A Christmas Carol.[4] The film stars James Stewart as George Bailey, a man who has given up his personal dreams in order to help others in his community and whose thoughts of suicide on Christmas Eve bring about the intervention of his guardian angel, Clarence Odbody (Henry Travers). Clarence shows George all the lives he touched and what the world would be like if he did not exist.",
    "Genre": {
      "Name": "Drama",
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
    {
    "Title": "Arsenic and Old Lace",
    "Description": "Arsenic and Old Lace is a 1944 American screwball mystery black comedy film directed by Frank Capra and starring Cary Grant. The screenplay by Julius J. Epstein and Philip G. Epstein is based on Joseph Kesselring's 1941 play of the same name.",
    "Genre": {
      "Name": "Black Comedy",
      "Description": ""
    },
    "Director": {
      "Name": "Frank Capra",
      "Bio": "",
      "Birth": 19
    },
    "ImageUrl": "",
    "Featured": true
  }
    {
    "Title": "Steel Magnolias",
    "Description": "Steel Magnolias is a 1989 American comedy-drama film directed by Herbert Ross and starring Academy Award winners Sally Field, Shirley MacLaine, and Olympia Dukakis with Dolly Parton, Daryl Hannah, and Julia Roberts.[4] The film is a film adaptation of Robert Harling's 1987 play of the same name about the bond a group of women share in a small-town Southern community, and how they cope with the death of one of their own.",
    "Genre": {
      "Name": "Comedy Drama",
      "Description": ""
    },
    "Director": {
      "Name": "Herbert Ross",
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
