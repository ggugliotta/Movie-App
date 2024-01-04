const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

/**
 * User model from the imported "models.js" module.
 * @type {Object}
 */
let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Configures Passport to use the LocalStrategy for username/password authentication.
 */
passport.use(
  new LocalStrategy(
    /**
     * Options for the LocalStrategy.
     * @type {Object}
     * @property {string} usernameField - The field name for the username.
     * @property {string} passwordField - The field name for the password.
     */
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    /**
     * LocalStrategy callback for authentication.
     * @callback LocalStrategyCallback
     * @param {string} username - The provided username for authentication.
     * @param {string} password - The provided password for authentication.
     * @param {function} callback - The callback function to be called upon authentication completion.
     */
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log("incorrect username");
            return callback(null, false, {
              message: "Incorrect username or password",
            });
          }
          if (!user.validatePassword(password)) {
            console.log("incorrect password");
            return callback(null, false, {
              message: "Incorrect password",
            });
          }
          console.log("finished");
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    }
  )
);

/**
 * Configures Passport to use the JWTStrategy for JSON Web Token (JWT) authentication.
 */
passport.use(
  new JWTStrategy(
    /**
     * Options for the JWTStrategy.
     * @type {Object}
     * @property {function} jwtFromRequest - Function to extract JWT from the request.
     * @property {string} secretOrKey - Secret key for decoding the JWT.
     */
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    /**
     * JWTStrategy callback for authentication.
     * @callback JWTStrategyCallback
     * @param {Object} jwtPayload - The decoded JWT payload.
     * @param {function} callback - The callback function to be called upon authentication completion.
     */
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
