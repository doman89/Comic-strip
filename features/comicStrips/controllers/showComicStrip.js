const {formatComicData} = require("./formatData");
const checkPermission = require("./checkPermission");

const viewComicStrip = async (request, response) => {
  try {
    const comicStrip = request.user.comicStrip;
    await checkPermission(request.user._id, comicStrip);
    response.json(formatComicData(comicStrip));
  } catch (error) {
    response.status(error.status || 500).send(error.message || error);
  }
};

module.exports = viewComicStrip;