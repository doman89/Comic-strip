const { formatedDataArray } = require("./../../../shared/services/formatData");

const showAllFriends = (request, response) =>
  response.json(formatedDataArray(request.user.friends));

module.exports = showAllFriends;
