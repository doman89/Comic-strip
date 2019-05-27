const userData = require("./../../../database/models/userSensitiveDataSchema");
const comicStripData = require("./../../../database/models/comicsDataSchema");

const deleteProfile = async (request, response) => {
  try {
    const currentUserID = request.user._id.toString();
    const currentUserProfile = await userData.findById(
      currentUserID
    );
    if (!currentUserProfile) {
      throw { message: "User profile not founded", status: 404 };
    }
    const userFriendsList = currentUserProfile.friendsList;
    const allFriendsProfile = await userData.find({
      _id: userFriendsList
    });
    allFriendsProfile.forEach(friendProfile => {
      friendProfile.friendsList.splice(
        friendProfile.friendsList.indexOf(currentUserID),
        1
      );
    });
    allFriendsProfile.map(
      async friendProfile =>
        await userData.findByIdAndUpdate(
          friendProfile._id,
          friendProfile
        )
    );
    await userData.findByIdAndDelete(currentUserID);
    const userComicStrips = await comicStripData.find({
      userID: currentUserID
    });
    userComicStrips.map(
      async comicStrip =>
        await comicStripData.findByIdAndDelete(comicStrip._id)
    );
    response.send("Goodbye user!");
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = deleteProfile;