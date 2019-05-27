const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const {
  configLocal,
  configFacebook,
  configGoogle
} = require("./configStrategies");
const { loginLocal, loginProvider } = require("../controllers/loginControllers");

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.use(new LocalStrategy(configLocal, loginLocal));
passport.use(new GoogleStrategy(configGoogle, loginProvider));
passport.use(new FacebookStrategy(configFacebook, loginProvider));
