const userData = require("./../../../database/models/userSensitiveDataSchema");

const deleteFriend = async (request, response) => {
    try {
      const currentUserID = request.user._id.toString();
      const friendsToRemoveID = request.params.id;
      const userProfile = request.user.profile;
      const friendProfile = await userData.findById(
        friendsToRemoveID
      );
      if (!friendProfile) {
        throw { message: "Friend profile not founded!", status: 404 };
      }
      userProfile.friendsList.splice(
        userProfile.friendsList.indexOf(friendsToRemoveID),
        1
      );
      friendProfile.friendsList.splice(
        friendProfile.friendsList.indexOf(currentUserID),
        1
      );
      await userData.findByIdAndUpdate(
        currentUserID,
        userProfile
      );
      await userData.findByIdAndUpdate(
        friendsToRemoveID,
        friendProfile
      );
      response.send(userProfile.friendsList);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  };

  module.exports = deleteFriend;

