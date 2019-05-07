const mongoose = require("mongoose");
const emailValidator = require("./validators/emailValidator");
const passwordValidator = require("./validators/passwordValidator");
const genderValidator = require("./validators/genderValidator");
const userNameValidator = require("./validators/userNameValidator");
const birthDateValidator = require("./validators/birthDateValidator");
const bcrypt = require("./../../controllers/bcryptController");

const Schema = mongoose.Schema;

const UserSensitiveDataSchema = new Schema({
  emailAddress: emailValidator,
  userName: userNameValidator,
  password: passwordValidator,
  gender: genderValidator,
  birthDate: birthDateValidator,
  profileID: String,
  userRole: Number
  bio: String,
  country: String,
  city: String,
  favouriteComicName: String,
});

UserSensitiveDataSchema.pre("save", bcrypt.securePassword);

const UserSensitiveData = mongoose.model("user", UserSensitiveDataSchema);

module.exports = UserSensitiveData;
