const userData = require("./../../../database/models/userSensitiveDataSchema");
const { formatedData } = require("./../../../shared/services/formatData");

const editProfile = async (request, response) => {
  try {
    const user = await userData.findById(request.params.id);
    if (user) {
      const editedUser = await userData.findByIdAndUpdate(
        user._id,
        request.body,
        { runValidators: true }
      );
      response.json(formatedData(editedUser));
    } else {
      throw { message: "User doesn't exist!", status: 404 };
    }
  } catch (error) {
    response.status(error.ststus || 500).send(error.message);
  }
};

module.exports = editProfile;
