const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      morgan = require("morgan"),
      uuid = require("uuid");

app.use(bodyParser.json());

let users = [
  {
    id: 1, 
    name: "Gabriella",
    favoriteMovie: []
  },
  {
    id: 2,
    name: "Roman",
    favoriteMovie: ["Mulan"]
  }
];

let movies = [
  {
    "Title": "Pride & Prejudice",
    "Description": "Pride & Prejudice is a 2005 romantic drama film directed by Joe Wright, in his feature directorial debut, and based on Jane Austen's 1813 novel of the same name. The film features five sisters from an English family of landed gentry as they deal with issues of marriage, morality and misconceptions.",
    "Genre": {
      "Name": "Romantic Drama",
      "Description": "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship or marriage is featured."
    },
    "Director": {
      "Name": "Joe Wright",
      "Bio": "Joseph Wright (born 25 August 1972) is an English film director residing in Somerset, England. His motion pictures include the literary adaptations Pride & Prejudice (2005), Atonement (2007), Anna Karenina (2012), and Cyrano (2021), the action thriller Hanna (2011), Peter Pan origin story Pan (2015), and Darkest Hour (2017), a political drama following Winston Churchill during World War II nominated for Best Picture.",
      "Birth": 1972
    },
    "ImageUrl": "https://upload.wikimedia.org/wikipedia/en/0/03/Prideandprejudiceposter.jpg",
    "Featured": true
  },
    {
    "Title": "Where the Heart Is",
    "Description": "Where the Heart Is is a 2000 American romantic drama film. The screenplay, written by Lowell Ganz and Babaloo Mandel, is based on the best-selling 1995 novel of the same name by Billie Letts. The film follows five years in the life of Novalee Nation, a pregnant 17-year-old who is abandoned by her boyfriend at a Walmart in a small Oklahoma town. She secretly moves into the store, where she eventually gives birth to her baby, which attracts media attention. With the help of friends, she makes a new life for herself in the town.",
    "Genre": {
      "Name": "Romantic Drama",
      "Description": "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship or marriage is featured."
    },
    "Director": {
      "Name": "Matt Williams",
      "Bio": "Matthew Williams (born April 18, 1951) is an American television producer, television writer, and professor.",
      "Birth": 1951
    },
    "ImageUrl": "https://m.media-amazon.com/images/I/41DAuh5ebqL._AC_UF894,1000_QL80_.jpg",
    "Featured": true
  },
    {
    "Title": "The Big Short",
    "Description": "The Big Short is a 2015 American biographical crime comedy-drama film.. It is based on the 2010 book The Big Short: Inside the Doomsday Machine by Michael Lewis showing how the 2007–2008 financial crisis was triggered by the United States housing bubble.",
    "Genre": {
      "Name": "Comedy Drama",
      "Description": "Comedy drama, also known by the portmanteau dramedy, is a genre of dramatic works that combines elements of comedy and drama."
    },
    "Director": {
      "Name": "Adam McKay",
      "Bio": "Adam McKay (born April 17, 1968) is an American film director, producer, screenwriter, and comedian. McKay began his career as a head writer for the NBC sketch comedy show Saturday Night Live (SNL) from 1995 to 2001. Following his departure from SNL, he rose to fame in the 2000s for his collaborations with comedian Will Ferrell and co-wrote his comedy films Anchorman, Talladega Nights, and The Other Guys.",
      "Birth": 1968
    },
    "ImageUrl": "https://flxt.tmsimg.com/assets/p12157971_p_v8_ae.jpg",
    "Featured": true
  },
    {
    "Title": "My Big Fat Greek Wedding",
    "Description": "My Big Fat Greek Wedding is a 2002 romantic comedy film written by Nia Vardalos. It follows a young Greek-American woman who falls in love with a non-Greek and struggles to get her family to accept him while she comes to terms with her heritage and cultural identity.",
    "Genre": {
      "Name": "Romantic Drama",
      "Description": "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship or marriage is featured."
    },
    "Director": {
      "Name": "Joel Zwick",
      "Bio": "Joel Rudolf Zwick (born January 11, 1942)[1] is an American film director, television director, and theater director. He worked on the television series Perfect Strangers, Full House, and Family Matters, and directed the films My Big Fat Greek Wedding, Second Sight, and Fat Albert.",
      "Birth": 1942
    },
    "ImageUrl": "https://m.media-amazon.com/images/M/MV5BNzcwOWU4NGEtYjUyMy00MDNlLThiN2MtYzFlMjk4Y2FhNjlmXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_FMjpg_UX1000_.jpg",
    "Featured": true
  },
    {
    "Title": "Mulan",
    "Description": "Mulan is a 1998 American animated musical adventure film produced by Walt Disney Feature Animation for Walt Disney Pictures. Based on the Chinese legend of Hua Mulan, it is the 36th Disney animated feature film, and the ninth animated feature film produced and released during the Disney Renaissance. The film's plot takes place in China during an unspecified Imperial dynasty, where Fa Mulan, daughter of aged warrior Fa Zhou, impersonates a man to take her father's place during a general conscription to counter a Hun invasion.",
    "Genre": {
      "Name": "Animation",
      "Description": "Animation is the method by which still images are manipulated to create moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, many animations are computer animations made with computer-generated imagery."
    },
    "Director": {
      "Name": "Tony Bancroft",
      "Bio": "Tony Bancroft is an American animator and film director who frequently collaborates with Disney. He is the founder and owner of the faith-driven animation company Toonacious Family Entertainment. Tony currently serves as the Executive VP Creative Development and Production for DivideNine Animation Studios.",
      "Birth": 1967
    },
    "ImageUrl": "https://lumiere-a.akamaihd.net/v1/images/p_mulan_20529_83d3893a.jpeg",
    "Featured": true
  },
    {
    "Title": "Selena",
    "Description": "Selena is a 1997 American biographical musical drama film. It is based on the true story of Tejano music star Selena Quintanilla-Pérez, chronicling her rise to fame and death when she was murdered by Yolanda Saldívar at the age of 23.",
    "Genre": {
      "Name": "Drama",
      "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."
    },
    "Director": {
      "Name": "Gregory Nava",
      "Bio": "Gregory James Nava (born April 10, 1949) is an American film director, producer and screenwriter.",
      "Birth": 1949
    },
    "ImageUrl": "https://upload.wikimedia.org/wikipedia/en/0/05/Selenathemovie.jpg",
    "Featured": true
  },
    {
    "Title": "The Phantom Menace",
    "Description": "Star Wars: Episode I The Phantom Menace is a 1999 American epic space opera film. It is the fourth film in the Star Wars film series, the first film of the prequel trilogy and the first chronological chapter of the Skywalker Saga. Set 32 years before the original trilogy, (13 years before the formation of the Galactic Empire), during the era of the Galactic Republic, the plot follows Jedi Master Qui-Gon Jinn and his apprentice Obi-Wan Kenobi as they try to protect Queen Padmé Amidala of Naboo in hopes of securing a peaceful end to an interplanetary trade dispute. Joined by Anakin Skywalker—a young slave with unusually strong natural powers of the Force—they simultaneously contend with the mysterious return of the Sith.",
    "Genre": {
      "Name": "Space Opera",
      "Description": "Space opera is a subgenre of science fiction that emphasizes space warfare, with use of melodramatic, risk-taking space adventures, relationships, and chivalric romance."
    },
    "Director": {
      "Name": "George Lucas",
      "Bio": "George Walton Lucas Jr. is an American filmmaker. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, Industrial Light & Magic, and THX. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012. Lucas is one of history's most financially successful filmmakers and has been nominated for four Academy Awards. Lucas personally directed or conceived 10 of the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation. Lucas is considered to be one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster. Despite this he's remained an independent filmmaker away from Hollywood for most of his career.",
      "Birth": 1944
    },
    "ImageUrl": "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/385C45162034D0D843A1DFE151986AA2C568643FD14A7B1FCE881F5393B24A56/scale?width=1200&aspectRatio=1.78&format=jpeg",
    "Featured": true
  },
    {
    "Title": "It/s a Wonderful Life",
    "Description": "It/s a Wonderful Life is a 1946 American Christmas supernatural drama film. It is based on the short story and booklet The Greatest Gift self-published by Philip Van Doren Stern in 1943, which itself is loosely based on the 1843 Charles Dickens novella A Christmas Carol.[4] The film stars James Stewart as George Bailey, a man who has given up his personal dreams in order to help others in his community and whose thoughts of suicide on Christmas Eve bring about the intervention of his guardian angel, Clarence Odbody (Henry Travers). Clarence shows George all the lives he touched and what the world would be like if he did not exist.",
    "Genre": {
      "Name": "Drama",
      "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."
    },
    "Director": {
      "Name": "Frank Capra",
      "Bio": "Frank Russell Capra was an Italian-born American film director, producer, and screenwriter who became the creative force behind some of the major award-winning films of the 1930s and 1940s.",
      "Birth": 1897
    },
    "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/It%27s_a_Wonderful_Life_%281946_poster%29.jpeg",
    "Featured": true
  },
    {
    "Title": "Arsenic and Old Lace",
    "Description": "Arsenic and Old Lace is a 1944 American screwball mystery black comedy film directed by Frank Capra and starring Cary Grant. The screenplay by Julius J. Epstein and Philip G. Epstein is based on Joseph Kesselring's 1941 play of the same name.",
    "Genre": {
      "Name": "Black Comedy",
      "Description": "Black comedy, also known as dark comedy, morbid humor, gallows humor, black humor, or dark humor, is a style of comedy that makes light of subject matter that is generally considered taboo, particularly subjects that are normally considered serious or painful to discuss."
    },
    "Director": {
      "Name": "Frank Capra",
      "Bio": "Frank Russell Capra was an Italian-born American film director, producer, and screenwriter who became the creative force behind some of the major award-winning films of the 1930s and 1940s.",
      "Birth": 1897
    },
    "ImageUrl": "https://s3.amazonaws.com/criterion-production/films/bc834199ef177e83604b93c31a1ad1a4/bWEA41YCQNEKPfVmws5oTnDP3FYcpa_large.jpg",
    "Featured": true
  },
    {
    "Title": "Steel Magnolias",
    "Description": "Steel Magnolias is a 1989 American comedy-drama film directed by Herbert Ross and starring Academy Award winners Sally Field, Shirley MacLaine, and Olympia Dukakis with Dolly Parton, Daryl Hannah, and Julia Roberts.[4] The film is a film adaptation of Robert Harling's 1987 play of the same name about the bond a group of women share in a small-town Southern community, and how they cope with the death of one of their own.",
    "Genre": {
      "Name": "Comedy Drama",
      "Description": "Comedy drama, also known by the portmanteau dramedy, is a genre of dramatic works that combines elements of comedy and drama."
    },
    "Director": {
      "Name": "Herbert Ross",
      "Bio": "Herbert David Ross was an American actor, choreographer, director and producer who worked predominantly in theater and film. He was nominated for two Academy Awards and a Tony Award.He is known for directing musical and comedies such as Goodbye, Mr. Chips (1969), The Owl and the Pussycat (1970), Play It Again, Sam (1972), The Sunshine Boys, Funny Lady (both 1975), The Goodbye Girl (1977), California Suite (1978), and Pennies From Heaven (1981). His later films include Footloose (1984), and Steel Magnolias (1989). For the drama The Turning Point (1977) he received two Academy Award nominations for Best Picture and Best Director and received the Golden Globe Award for Best Director.",
      "Birth": 1927
    },
    "ImageUrl": "https://m.media-amazon.com/images/M/MV5BZTVkNWM2YjgtYjRhNC00OWQ5LWFiMDAtYWI2MTM0ZDk1ODE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
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

 //Update User Info
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
        user.favoriteMovies.push(movieTitle);
        res.status(200).json(user)
    } else {
        res.status(400).send("no such user")
    }
 })

  //DELETE
 app.delete("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;

     let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filer(title => !== movieTitle);
        res.status(200).send('${movieName} has been removed from user ${id}/s array');
    } else {
        res.status(400).send("no such user")
    }
 })


//READ Movies List 
app.get("/movies", (req, res) => {
  res.status(200).json(Movies);
});

//READ Movie Title
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
