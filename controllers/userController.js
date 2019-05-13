const userSensitiveDataSchema = require("../database/models/userSensitiveDataSchema");
const { userRoleEnums } = require("./roleController");

const userDataToShow = dataFromAPI => ({
  _id: dataFromAPI._id,
  emailAddress: dataFromAPI.emailAddress,
  userName: dataFromAPI.userName,
  gender: dataFromAPI.gender,
  birthDate: dataFromAPI.birthDate,
  userRole: dataFromAPI.userRole,
  bio: dataFromAPI.bio,
  country: dataFromAPI.country,
  city: dataFromAPI.city,
  favouriteComicName: dataFromAPI.favouriteComicName
});

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
    if (!password || !gender || !birthDate) {
      response.status(400).json({ error: "Please type all required data!" });
    }
    const user = new userSensitiveDataSchema({
      emailAddress,
      userName,
      password,
      gender,
      birthDate,
      userRole: userRoleEnums.USER
    });
    user
      .save()
      .then(member => {
        request.user = {
          emailAddress: member.emailAddress,
          userRole: member.userRole
        };
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
      const user = await userSensitiveDataSchema.findOne({ emailAddress });
      if (user) {
        done(null, user);
      } else {
        done(null, null);
      }
    } catch (error) {
      done(error, null);
    }
  },
  getAllUsers: (request, response) => {
    userSensitiveDataSchema.find({}).then(users => {
      const usersList = users.map(user => userDataToShow(user));
      response.json(usersList);
    });
  },
  getUserProfile: (request, response) => {
    userSensitiveDataSchema
      .findOne({
        _id: request.params.id
      })
      .then(user => {
        response.json(userDataToShow(user));
      });
  }
};
