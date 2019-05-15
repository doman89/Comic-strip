const userRoleEnums = Object.freeze({
  USER: 0,
  MODERATOR: 1,
  ADMIN: 2
});

const permissions = {
  [userRoleEnums.USER]: {
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
  [userRoleEnums.MODERATOR]: {
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
  [userRoleEnums.ADMIN]: {
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

const canUserAccessToProfile = (
  targetUserID,
  currentUserID,
  currentUserRole,
) => !!((targetUserID === currentUserID) || (currentUserRole === userRoleEnums.ADMIN));


const hasCurrentUserPermission = (currentUserRole, dataToChange) => {
  for (let data in dataToChange) {
    if (!permissions[currentUserRole][data]) {
      return false;
    }
  }
  return true;
};

module.exports = {
  userRoleEnums,
  checkPermissions: (request, response, next) => {
    const currentUserID = request.user._id;
    const currentUserRole = request.user.userRole;
    const targetUserID = request.params.id;
    const dataToChange = request.body;
    let permission = canUserAccessToProfile(
      targetUserID,
      currentUserID,
      currentUserRole,
    );
    if (permission){
      if( currentUserRole === userRoleEnums.MODERATOR && currentUserID.toString() === targetUserID){
        hasCurrentUserPermission(userRoleEnums.USER , dataToChange)
            ? next()
            : response.status(403).json({ error: "Your role given't you access to this data." });
      }else{
        hasCurrentUserPermission(currentUserRole, dataToChange)
            ? next()
            : response.status(403).json({ error: "Your role given't you access to this data." });
      }
    }else{
      response.status(403).json({ error: "Access denied!" });
    }
  }
};
