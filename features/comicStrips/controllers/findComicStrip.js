const userData = require("./../../../database/models/userSensitiveDataSchema");
const comicData = require("./../../../database/models/comicsDataSchema");
const {
  PUBLIC,
  FRIENDS_ONLY,
  PRIVATE
} = require("../../../shared/enums/privacyLevel").privacyLevelEnums;
const {formatComicDataArray} = require("./formatData");

const compareString = (stringToFind, objectString) => {
  if (!objectString) {
    return false;
  }
  if (typeof objectString !== "object") {
    return !!(
      stringToFind &&
      objectString.toLowerCase().includes(stringToFind.toLowerCase())
    );
  } else {
    return !!(
      stringToFind &&
      objectString.map(tag => {
        if (tag.toLowerCase() === stringToFind.toLowerCase()) {
          return true;
        }
      })
    );
  }
};

const findComicStrip = async (request, response) => {
  try {
    const { tag, title, description } = request.query;
    const currentUserID = request.user._id.toString();
    const allComicStripsList = await comicData.find({});
    const { friendsList } = await userData.findById(currentUserID);
    if (tag || title || description) {
      const comicStripsList = allComicStripsList.filter(
        comicStrip =>
          (comicStrip.privacyLevel === PUBLIC ||
            (FRIENDS_ONLY && friendsList.includes(comicStrip.userID))) &&
          (compareString(tag, comicStrip.tags) ||
            compareString(title, comicStrip.title) ||
            compareString(description, comicStrip.description))
      );
      response.json(formatComicDataArray(comicStripsList));
    } else {
      const comicStripsList = allComicStripsList.filter(
        comicStrip =>
          comicStrip.userID === currentUserID ||
          (friendsList.includes(comicStrip.userID) &&
            comicStrip.privacyLevel !== PRIVATE)
      );
      response.json(formatComicDataArray(comicStripsList));
    }
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = findComicStrip;
