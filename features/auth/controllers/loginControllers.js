const { createNewUser } = require("./registrationController");
const bcrypt = require("bcrypt");
const userData = require("./../../../database/models/userSensitiveDataSchema");

const loginProvider = async (accessToken, refreshToken, { _json }, done) => {
  try {
    console.log({_json});
    const user = await userData.findOne({
      emailAddress: _json.email
    });
    user ? done(null, user) : done(null, await createNewUser(_json));
  } catch (error) {
    done(error, null);
  }
};

const loginLocal = async (emailAddress, password, done) => {
  try {
    const user = await userData.findOne({ emailAddress });
    if (user) {
      if (user.password) {
        (await bcrypt.compare(password, user.password))
          ? done(null, user)
          : done(null, null);
      }
      done(null, false);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
};

module.exports = {
  loginProvider,
  loginLocal
};
