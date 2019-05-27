const userData = require("./../../../database/models/userSensitiveDataSchema");
const {userRole} = require("../../../shared/enums/userRole");

const createNewUser = async (request, response, next) => {
  try {
    const {
      emailAddress,
      userName,
      password,
      gender,
      birthDate
    } = request.body;
    if (!password || !gender || !birthDate) {
      throw { message: "Please type all required data!", status: 400 };
    }
    if (await userData.findOne({ emailAddress })) {
      throw { message: "This email address has been used", status: 400 };
    }
    const newUser = new userData({
      emailAddress,
      userName,
      password,
      gender,
      birthDate,
      userRole: userRole.USER
    });
    const createdUser = await newUser.save();
    request.user = {
      emailAddress: createdUser.emailAddress,
      userRole: createdUser.userRole
    };
    next();
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = {
  createNewUser
};
