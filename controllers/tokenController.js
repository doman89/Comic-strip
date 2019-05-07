const jwt = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userSensitiveDataSchema = require("../database/models/userSensitiveDataSchema");

module.exports = {
  configureJWTStrategy: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_PASSWORD
  },
  handleUserAuthorization: async (payload, done) => {
    try {
      const { emailAddress } = payload;
      const foundedUser = await userSensitiveDataSchema.findOne({
        emailAddress
      });
      done(null, foundedUser);
    } catch (error) {
      done(error, null);
    }
  },
  makeToken: async (request, response) => {
    const { emailAddress, userRole } = request.user;
    const token = jwt.sign(
      { emailAddress, userRole },
      process.env.SECRET_PASSWORD,
      { expiresIn: 1200 }
    );
    response.json({ token: `Bearer ${token}` });
  }
};
