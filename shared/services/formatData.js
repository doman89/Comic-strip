const isNotUndefined = prop => (prop !== void 0 ? prop : null);

const formatedData = userData => ({
  _id: isNotUndefined(userData._id),
  emailAddress: isNotUndefined(userData.emailAddress),
  userName: isNotUndefined(userData.userName),
  gender: isNotUndefined(userData.gender),
  birthDate: isNotUndefined(userData.birthDate),
  userRole: isNotUndefined(userData.userRole),
  bio: isNotUndefined(userData.bio),
  country: isNotUndefined(userData.country),
  city: isNotUndefined(userData.city),
  favouriteComicName: isNotUndefined(userData.favouriteComicName)
});

const formatedDataArray = userDataList => {
  return userDataList.map(userData => formatedData(userData));
};

module.exports = {
    formatedData,
    formatedDataArray
};
