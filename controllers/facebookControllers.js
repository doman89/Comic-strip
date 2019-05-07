const UserSensitiveDataSchema = require("./../database/models/userSensitiveDataSchema");

module.exports = {
  configureFacebookStrategy: {
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRECT,
    profileFields: [
      "id",
      "displayName",
      "name",
      "gender",
      "profileUrl",
      "emails",
      "photos"
    ]
  },
  handleLogInFacebookUser: async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const user = await UserSensitiveDataSchema.findOne({
      emailAddress: profile.email
    });
    user ? done(null, user) : done(null, await createNewUser(profile));
  }
};
