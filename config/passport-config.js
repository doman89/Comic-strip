const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const {
  configureJWTStrategy,
  handleUserAuthorization
} = require("./../controllers/tokenController");
const {
  configureLocalStrategy,
  handleLogInLocalUser
} = require("./../controllers/userController");
const {
  configureGoogleStrategy,
  handleLogInGoogleUser
} = require("./../controllers/googleController");
const {
  configureFacebookStrategy,
  handleLogInFacebookUser
} = require("./../controllers/facebookControllers");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new JWTStrategy(configureJWTStrategy, handleUserAuthorization));

passport.use(new LocalStrategy(configureLocalStrategy, handleLogInLocalUser));

passport.use(
  new GoogleStrategy(configureGoogleStrategy, handleLogInGoogleUser)
);

passport.use(
  new FacebookStrategy(configureFacebookStrategy, handleLogInFacebookUser)
);
