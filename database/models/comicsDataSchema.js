const monoogse = require("mongoose");
const urlAddressValidator = require("./validators/urlAddressValidator");
const privacyLevelValidator = require("./validators/privacyLevelValidator");
const descriptionValidator = require("./validators/descriptionValidator");
const titleValidator = require("./validators/titleValidator");
const tagsValidator = require("./validators/tagsValidator");

const Schema = monoogse.Schema;

const comicsDataSchema = new Schema({
  userID: String,
  urlAddress: urlAddressValidator,
  description: descriptionValidator,
  title: titleValidator,
  privacyLevel: privacyLevelValidator,
  createdAt: Date,
  updatedAt: Date,
  tags: tagsValidator
});

comicsDataSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

const comicsData = monoogse.model("comics", comicsDataSchema);

module.exports = comicsData;
