const userData = require("../../../database/models/userSensitiveDataSchema");
const { formatedData } = require("./../../../shared/services/formatData");

const getUserProfile = async (request, response) => {
  try {
    const userProfile = await userData.findById(request.params.id);
    if (!userProfile) {
      throw { message: "User doesn't exist", status: 404 };
    } else {
      response.json(formatedData(userProfile));
    }
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = getUserProfile;
