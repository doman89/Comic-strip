const userData = require("../../../database/models/userSensitiveDataSchema");
const { formatedData } = require("../../../shared/services/formatData");

const addFriend = async (request, response) => {
  try {
    const friendID = request.params.id;
    const userID = request.user._id.toString();
    const userProfile = request.user.profile;
    if (userID === friendID) {
      throw {
        message: "Why you will have yourself in friends?? :)",
        status: 400
      };
    }
    const friendProfile = await userData.findById(friendID);
    if (!friendProfile) {
      throw { message: "User doesn't exist!", status: 404 };
    }
    userProfile.friendsList.map(friend => {
      if (friend === friendID) {
        throw { message: "You have this friend in your list", status: 400 };
      }
    });
    userProfile.friendsList.push(friendID);
    friendProfile.friendsList.push(userID);
    await userData.findByIdAndUpdate(userID, userProfile, {
      runValidators: true
    });
    await userData.findByIdAndUpdate(friendID, friendProfile, {
      runValidators: true
    });
    response.json(formatedData(friendProfile));
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = addFriend;
