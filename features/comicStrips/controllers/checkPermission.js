const userData = require("../../../database/models/userSensitiveDataSchema");
const {FRIENDS_ONLY, PRIVATE} = require("../../../shared/enums/privacyLevel").privacyLevelEnums;

const checkPermission = async (
    currentUserID,
    { userID, privacyLevel }
  ) => {
    if (currentUserID.toString() === userID) {
      return true;
    }
    if (privacyLevel === PRIVATE) {
      throw {
        message:
          "The privacy settings of the user don't give you access to this comic strip",
        status: 403 
      };
    } else if (privacyLevel === FRIENDS_ONLY) {
      const comicStripOwner = await userData.findById(userID);
      if (!comicStripOwner) {
        throw { message: "Not founded comic strip owner", status: 400 };
      }
      if (
        !(comicStripOwner.friendsList.includes(currentUserID.toString()))
      ) {
        throw {
          message:
            "The privacy settings of the user don't give you access to this comic strip",
          status: 403
        };
      }
    }
  };

  module.exports = checkPermission;