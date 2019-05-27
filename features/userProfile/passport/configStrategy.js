const ExtractJwt = require("passport-jwt").ExtractJwt;

const configJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_PASSWORD
};

module.exports = configJWT;
