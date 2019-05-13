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
    emailAddress: true,
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

const isCurrentUserOwnerAccount = (
  targetUserID,
  currentUserID,
  dataToChange,
  currentUserRole,
  next
) => {
  if (targetUserID == currentUserID) {
    if (dataToChange.userRole && currentUserRole !== userRoleEnums.ADMIN) {
      return;
    }
    next();
  }
};

const hasCurrentUserPermission = (currentUserRole, dataToChange, next) => {
  for (data in dataToChange) {
    if (!permissions[currentUserRole][data]) {
      return;
    }
  }
  next();
};

module.exports = {
  userRoleEnums,
  checkPermissions: (request, response, next) => {
    const currentUserID = request.user._id;
    const currentUserRole = request.user.userRole;
    const targetUserID = request.params.id;
    const dataToChange = request.body;
    isCurrentUserOwnerAccount(
      targetUserID,
      currentUserID,
      dataToChange,
      currentUserRole,
      next
    );
    hasCurrentUserPermission(currentUserRole, dataToChange, next);
    response.status(403).json({ error: "Access denied!" });
  }
};
