const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

/**
 * Mongoose Schema for movies.
 * @typedef {Object} MovieSchema
 * @property {string} Title - The title of the movie. (Required)
 * @property {string} Description - The description of the movie. (Required)
 * @property {Object} Genre - The genre details.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - The description of the genre.
 * @property {Object} Director - The director details.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - The biography of the director.
 * @property {Date} Director.Birth - The birth date of the director.
 * @property {Date} Director.Death - The death date of the director.
 * @property {string[]} Actors - An array of actor names.
 * @property {string} ImagePath - The image path for the movie.
 * @property {boolean} Featured - Indicates if the movie is featured.
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Date,
    Death: Date
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

/**
 * Mongoose Schema for users.
 * @typedef {Object} UserSchema
 * @property {string} Name - The name of the user. (Required)
 * @property {string} Username - The username of the user. (Required)
 * @property {string} Password - The hashed password of the user.
 * @property {string} Email - The email address of the user. (Required)
 * @property {Date} Birthday - The birthday of the user.
 * @property {mongoose.Types.ObjectId[]} FavoriteMovies - An array of movie IDs that the user has marked as favorites.
 */
let userSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Username: { type: String, required: true },
  Password: { type: String }, // required: true
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

/**
 * Hashes the provided password using bcrypt.
 * @function
 * @param {string} password - The password to be hashed.
 * @returns {string} - The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates the provided password against the stored hashed password.
 * @method
 * @param {string} password - The password to be validated.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Mongoose Model for movies.
 * @type {mongoose.Model}
 */
let Movie = mongoose.model('Movie', movieSchema);

/**
 * Mongoose Model for users.
 * @type {mongoose.Model}
 */
let User = mongoose.model('User', userSchema);

/**
 * Exports the Movie and User models.
 * @module
 * @type {{Movie: mongoose.Model, User: mongoose.Model}}
 */
module.exports = {
  Movie: Movie,
  User: User
};
