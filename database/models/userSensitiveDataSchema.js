const mongoose = require("mongoose");
const emailValidator = require("./validators/emailValidator");
const passwordValidator = require("./validators/passwordValidator");
const genderValidator = require("./validators/genderValidator");
const userNameValidator = require("./validators/userNameValidator");
const birthDateValidator = require("./validators/birthDateValidator");
const visiblePublicValidator = require("./validators/visiblePublicValidator");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);

const Schema = mongoose.Schema;

function encryptPassword(next) {
    if (!this.isModified("password")) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        next();
      });
    });
  }

const UserSensitiveDataSchema = new Schema({
  emailAddress: emailValidator,
  userName: userNameValidator,
  password: passwordValidator,
  gender: genderValidator,
  birthDate: birthDateValidator,
  userRole: Number,
  bio: String,
  country: String,
  city: String,
  favouriteComicName: String,
  visiblePublic: visiblePublicValidator,
  friendsList: [String]
});

UserSensitiveDataSchema.pre("save", encryptPassword);

const UserSensitiveData = mongoose.model("users", UserSensitiveDataSchema);

module.exports = UserSensitiveData;
