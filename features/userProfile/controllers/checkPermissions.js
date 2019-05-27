const {
  ADMIN,
  USER,
  MODERATOR
} = require("./../../../shared/enums/userRole").userRole;

const permissions = {
  [USER]: {
    _id: false,
    emailAddress: false,
    userName: true,
    password: true,
    gender: true,
    birthDate: true,
    userRole: false,
    bio: true,
    country: true,
    city: true,
    favouriteComicName: true
  },
  [MODERATOR]: {
    _id: false,
    emailAddress: false,
    userName: false,
    password: false,
    gender: false,
    birthDate: false,
    userRole: false,
    bio: false,
    country: false,
    city: false,
    favouriteComicName: false
  },
  [ADMIN]: {
    _id: false,
    emailAddress: false,
    userName: true,
    password: true,
    gender: true,
    birthDate: true,
    userRole: true,
    bio: true,
    country: true,
    city: true,
    favouriteComicName: true
  }
};

const accessToProfile = (targetUserID, currentUserID, currentUserRole) =>
  !!(targetUserID === currentUserID || currentUserRole === ADMIN);

const comparePermissions = (currentUserRole, dataToChange) => {
  for (let data in dataToChange) {
    if (!permissions[currentUserRole][data]) {
      return false;
    }
  }
  return true;
};

const checkPermissions = (request, response, next) => {
  try {
    const currentUserID = request.user._id.toString();
    const currentUserRole = request.user.userRole;
    const targetUserID = request.params.id;
    const dataToChange = request.body;
    let permission = accessToProfile(
      targetUserID,
      currentUserID,
      currentUserRole
    );
    if (permission) {
      const useAppropriateRole =
        currentUserRole !== USER && currentUserID === targetUserID
          ? USER
          : currentUserRole;
      if (comparePermissions(useAppropriateRole, dataToChange)) {
        next();
      } else {
        throw {
          message: "Your role given't you access to this data.",
          status: 403
        };
      }
    } else {
      throw { message: "Access denied.", status: 403 };
    }
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = checkPermissions;
