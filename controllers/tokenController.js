const jwt = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userSensitiveDataSchema = require("../database/models/userSensitiveDataSchema");

module.exports = {
  configureJWTStrategy: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_PASSWORD
  },
  handleUserAuthorization: (payload, done) => {
    const { _id } = payload;
    userSensitiveDataSchema
      .findOne({ _id })
      .then(foundedUser => done(null, foundedUser))
      .catch(error => done(error, null));
  },
  makeToken: (request, response) => {
    const { _id, userRole } = request.user;
    const token = jwt.sign({ _id, userRole }, process.env.SECRET_PASSWORD, {
      expiresIn: 1200
    });
    response.json({ token: `Bearer ${token}` });
  }
};
