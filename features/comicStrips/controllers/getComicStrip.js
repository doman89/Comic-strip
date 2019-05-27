const comicData = require("./../../../database/models/comicsDataSchema");

const getComicStrip = async (request, response, next) => {
    try{
        const comicStripID = request.params.id;
    const currentUserID = request.user._id;
    const currentUserRole = request.user.userRole;
    const comicStrip = await comicData.findById(comicStripID);
    if (!comicStrip) {
      throw { message: "This comic strip doesn't exist!", status: 404 };
    }
    // if (
    //   mode &&
    //   currentUserRole === userRoleEnums.USER &&
    //   currentUserID.toLocaleString() !== comicStrip.userID
    // ) {
    //   throw {
    //     message: "You haven't access to this comic strip, if you aren't owner!",
    //     status: 403
    //   };
    // }
    request.user.comicStrip = comicStrip;
    next();
    }catch(error){
        response.status(error.status || 500).send(error.message);
    }
  };

  module.exports = getComicStrip;