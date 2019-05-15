const userSensitiveDataSchema = require("../database/models/userSensitiveDataSchema");
const bcrypt = require("bcrypt");
const { userRoleEnums } = require("./roleController");

const userDataToShow = dataFromAPI => ({
  _id: dataFromAPI._id !== void(0) ? dataFromAPI._id : null,
  emailAddress: dataFromAPI.emailAddress !== void(0) ? dataFromAPI.emailAddress : null,
  userName: dataFromAPI.userName !== void(0) ? dataFromAPI.userName : null,
  gender: dataFromAPI.gender !== void(0) ? dataFromAPI.gender : null,
  birthDate: dataFromAPI.birthDate !== void(0) ? dataFromAPI.birthDate : null,
  userRole: dataFromAPI.userRole !== void(0) ? dataFromAPI.userRole : null,
  bio: dataFromAPI.bio !== void(0) ? dataFromAPI.bio : null,
  country: dataFromAPI.country !== void(0) ? dataFromAPI.country : null,
  city: dataFromAPI.city !== void(0) ? dataFromAPI.city : null,
  favouriteComicName: dataFromAPI.favouriteComicName !== void(0) ? dataFromAPI.favouriteComicName : null,
});

const isUserExists = async (request, response) => {
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
        if(user.password){
          const goodPassword = await bcrypt.compare(password, user.password);
          goodPassword ? done(null, user) : done(null, null);
        }
        done(null, null)
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
      })
      .catch(() => response.json({error: "User doesn't exist"}));
  },
  deleteUserProfile: (request, response) => {
    userSensitiveDataSchema.findOneAndDelete({_id: request.params.id}, () => response.json({message: `User has been deleted!`}))
  },
  editUserProfile: async (request, response) => {
    try{
      const user = await userSensitiveDataSchema.findOne({_id: request.params.id});
      if(user){
        const editedUser = await userSensitiveDataSchema.findByIdAndUpdate({_id: user._id}, request.body, { runValidators: true });
        response.json(userDataToShow(editedUser));
      }else{
        response.status(404).json({error: "User doesn't exist!"});
      }
    }catch (error) {
      response.status(500).json({error: error.message});
    }
  }
};