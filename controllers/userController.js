const userSensitiveDataSchema = require("../database/models/userSensitiveDataSchema");

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
  createNewUser: (request, response, next) => {
    const {
      emailAddress,
      userName,
      password,
      gender,
      birthDate
    } = request.body;
    const userRole = 0;
    if (!password || !gender || !birthDate) {
      response.status(400).json({ error: "Please type all required data!" });
    }
    const user = new userSensitiveDataSchema({
      emailAddress,
      userName,
      password,
      gender,
      birthDate,
      userRole
    });
    user
      .save()
      .then(() => {
        request.user = { emailAddress, userRole };
        next();
      })
      .catch(error => response.json({ error: error.message }));
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
