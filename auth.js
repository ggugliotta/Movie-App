/**
 * Secret key for encoding and decoding JWT tokens.
 * @type {string}
 */
const jwtSecret = ("your_jwt_secret"); // This has to be the same key used in the JWTStrategy 

const jwt = require("jsonwebtoken"),
  passport = require("passport");

  require("./passport"); // Your local passport file

  /**
   * Generates a JWT token for the given user
   * @param {Object} user - The user object to be encoded in the JWT.
   * @returns {string} - The generated JWT token.
   */
  let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
      subject: user.Username, //This is the username you're encoding in the JWT
      expiresIn: "7d", // This specifies that the token will expire in 7 days
      algorithm: "HS256" // This is the algorithm used to "sign" or encode the values of the JWT 
    });
  }

  /**
   * Handles the POST request for user login.
   * @param {Object} router - The Express router object.
   */
  module.exports = (router) => {
    router.post("/login", (req, res) => {
      /**
       * Authenticates the user using the local strategy
       * @callback passportAuthenticateCallback
       * @param {Error} error - Any authentication error.
       * @param {Object} user - Authenticated user object.
       * @param {Object} info - Additional info about the 
       */
      passport.authenticate("local", { session: false }, (error, user, info) => {
        if (error || !user) {
          return res.status(400).json({
            message: "Something is not right",
            user: user
          });
        }
        req.login(user, { session: false }, (error) => {
          if (error) {
            res.send(error);
          }
          let token = generateJWTToken(user.toJSON());
          return res.json({ user, token });
        });
      }) (req, res);
    });
  }