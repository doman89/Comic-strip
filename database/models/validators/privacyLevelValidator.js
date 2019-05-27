const validate = require("mongoose-validator");
const {
  PUBLIC, PRIVATE
} = require("../../../shared/enums/privacyLevel").privacyLevelEnums;

validate.extend(
  "isGoodPrivacyLevel",
  level => {
    return (
      PUBLIC <= level && level <= PRIVATE
    );
  },
  "It isn't a good privacy level"
);

const privacyLevelValidator = [
  validate({
    validator: "isGoodPrivacyLevel"
  })
];

module.exports = {
  type: Number,
  required: true,
  default: PRIVATE,
  validate: privacyLevelValidator
};
