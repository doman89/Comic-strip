const { ADMIN } = require("./../../../shared/enums/userRole").userRole;
const comicData = require("./../../../database/models/comicsDataSchema");
const {
  PUBLIC
} = require("./../../../shared/enums/privacyLevel").privacyLevelEnums;

const removeComicStrip = async (request, response) => {
  try {
    const comicStrip = request.user.comicStrip;
    const currentUserRole = request.user.userRole;
    const currentUserID = request.user._id.toString();
    if (currentUserID !== comicStrip.userID && currentUserRole !== ADMIN) {
      if (comicStrip.privacyLevel !== PUBLIC) {
        throw {
          message:
            "You haven't access to this comic strip, if you aren't owner!",
          status: 403
        };
      }
    }
    await comicData.findByIdAndDelete(comicStrip._id);
    response.json(comicStrip);
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = removeComicStrip;
