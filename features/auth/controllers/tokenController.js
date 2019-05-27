const jwt = require("jsonwebtoken");

const sendToken = (request, response) => {
  const { _id, userRole } = request.user;
  const token = jwt.sign({ _id, userRole }, process.env.SECRET_PASSWORD, {
    expiresIn: 1200
  });
  response.json({ token: `Bearer ${token}` });
};

module.exports = {
  sendToken
};
