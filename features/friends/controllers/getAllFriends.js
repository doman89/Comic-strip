const userData = require("./../../../database/models/userSensitiveDataSchema");

const getAllFriends = async (request, response, next) => {
  try {
    const userProfile = await userData.findById(request.user._id);
    if (!userProfile) {
      throw { message: "User profile not founded!", status: 404 };
    }
    const userFriends = userProfile.friendsList;
    const userFriendsProfile = await userData.find({
      _id: userFriends
    });
    request.user.friends = userFriendsProfile;
    request.user.profile = userProfile;
    next();
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = getAllFriends;
