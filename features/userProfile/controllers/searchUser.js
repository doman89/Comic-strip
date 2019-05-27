const userData = require("../../../database/models/userSensitiveDataSchema");
const { formatedDataArray } = require("./../../../shared/services/formatData");

const stringContainAnother = (mainString, checkedString) =>
  !!(mainString.toLocaleLowerCase().indexOf(checkedString) > -1);

const findUsers = async (request, response) => {
  const { userName, emailAddress } = request.query;
  const allUsers = await userData.find({});
  const allAvailableUsers = allUsers.filter(
    user =>
      user._id.toString() !== request.user._id.toString() &&
      user.visiblePublic === true
  );
  request.query.userName || request.query.emailAddress
    ? response.json(
        formatedDataArray(
          allAvailableUsers.filter(
            user =>
              (userName && stringContainAnother(user.userName, userName)) ||
              (emailAddress && user.emailAddress === emailAddress)
          )
        )
      )
    : response.json(formatedDataArray(allAvailableUsers));
};

module.exports = findUsers;
