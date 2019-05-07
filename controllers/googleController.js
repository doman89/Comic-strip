const UserSensitiveDataSchema = require("./../database/models/userSensitiveDataSchema");

const createNewUser = async profile => {
  try {
    const newUser = new UserSensitiveDataSchema({
      emailAddress: profile.email,
      userName: profile.name,
      profileID: profile.sub,
      userRole: 0
    });
    return await newUser.save();
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  configureGoogleStrategy: {
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  handleLogInGoogleUser: async (accessToken, refreshToken, { _json }, done) => {
    const user = await UserSensitiveDataSchema.findOne({
      emailAddress: _json.email
    });
    user ? done(null, user) : done(null, await createNewUser(_json));
  }
};
