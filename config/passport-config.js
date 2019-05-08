const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const {
  configureFacebookStrategy,
  configureGoogleStrategy,
  handleLogInProviderUser
} = require("./../controllers/providerController");
const {
  configureJWTStrategy,
  handleUserAuthorization
} = require("./../controllers/tokenController");
const {
  configureLocalStrategy,
  handleLogInLocalUser
} = require("./../controllers/userController");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new JWTStrategy(configureJWTStrategy, handleUserAuthorization));

passport.use(new LocalStrategy(configureLocalStrategy, handleLogInLocalUser));

passport.use(
  new GoogleStrategy(configureGoogleStrategy, handleLogInProviderUser)
);

passport.use(
  new FacebookStrategy(configureFacebookStrategy, handleLogInProviderUser)
);
