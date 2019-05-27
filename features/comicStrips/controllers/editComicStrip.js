const comicData = require("./../../../database/models/comicsDataSchema");
const {formatComicData} = require("./formatData");
const {PUBLIC} = require("./../../../shared/enums/privacyLevel");
const {ADMIN} = require("./../../../shared/enums/userRole");

const editComicStrip = async (request, response) => {
  try {
    const {comicStrip} = request.user;
    const currentUserID = request.user._id.toString();
    const currentUserRole = request.user.userRole;
    if (currentUserID !== comicStrip.userID && currentUserRole !== ADMIN) {
        if (comicStrip.privacyLevel !== PUBLIC) {
          throw {
            message:
              "You haven't access to this comic strip, if you aren't owner!",
            status: 403
          };
        }
      }
    const { urlAddress, description, title, privacyLevel, tags } = request.body;
    const editedComicStrip = await comicData.findByIdAndUpdate(
      comicStrip._id,
      { urlAddress, description, title, privacyLevel, tags },
      { runValidators: true, new: true }
    );
    response.json(formatComicData(editedComicStrip));
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = editComicStrip;