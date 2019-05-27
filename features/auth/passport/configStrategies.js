const configLocal = {
  usernameField: "emailAddress",
  passwordField: "password"
};

const configGoogle = {
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};
const configFacebook = {
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRECT,
  profileFields: ["id", "displayName", "name", "gender", "emails"]
};

module.exports = {
    configLocal,
    configGoogle,
    configFacebook
}