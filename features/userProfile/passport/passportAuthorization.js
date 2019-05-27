const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const configToken = require("./configStrategy");
const authorization = require("./../controllers/tokenController");

passport.use(new JWTStrategy(configToken, authorization));