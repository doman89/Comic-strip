const userSensitiveDataSchema = require("../database/models/userSensitiveDataSchema");
const bcryptController = require("./../controllers/bcryptController");

isUserExists = async (request, response) => {
  try {
    const { emailAddress } = request.body;
    const foundedUser = await userSensitiveDataSchema.findOne({
      emailAddress
    });
    if (foundedUser) {
      request.body.hash = foundedUser.password;
    }
    return !!foundedUser;
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  isEmailUsed: async (request, response, next) => {
    if (await isUserExists(request)) {
      response.status(500).json({
        error: `This e-mail address ${request.body.emailAddress} was used!`
      });
    } else {
      next();
    }
  },
  createNewUser: (request, response) => {
    const {
      emailAddress,
      userName,
      password,
      gender,
      birthDate
    } = request.body;
    const user = new userSensitiveDataSchema({
      emailAddress,
      userName,
      password,
      gender,
      birthDate
    });
    user
      .save()
      .then(result => response.json({ id: result._id }))
      .catch(error => response.json({ error: error.message }));
  },
  logInUser: async (request, response, next) => {
    if (await isUserExists(request, response)) {
      bcryptController.checkPassword(request, response, next);
    } else {
      response
        .status(404)
        .json({ error: `User: ${request.body.emailAddress} doesn't exists.` });
    }
  },
  configureLocalStrategy: {
    usernameField: "emailAddress",
    passwordField: "password"
  },
  handleLogInLocalUser: async (emailAddress, password, done) => {
    try {
      console.log(emailAddress, password);
      const user = await userSensitiveDataSchema.findOne({ emailAddress });
      if (user) {
        done(null, user);
      } else {
        done(null, null);
      }
    } catch (error) {
      done(error, null);
    }
  }
};
