const comicData = require("./../../../database/models/comicsDataSchema");
const { formatComicData } = require("./formatData");

const newComicStrip = async (request, response) => {
  try {
    const {
      urlAddress,
      description,
      title,
      privacyLevel,
      tags = null
    } = request.body;
    const userID = request.user._id;
    const comicStrip = new comicData({
      urlAddress,
      description,
      title,
      tags,
      privacyLevel,
      userID
    });
    const createdComicStrip = await comicStrip.save();
    response.send(formatComicData(createdComicStrip));
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = newComicStrip;
