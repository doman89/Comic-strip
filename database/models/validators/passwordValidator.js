const validate = require("mongoose-validator");

const passwordValidator = [
  validate({
    validator: "matches",
    arguments: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
    message: `Password should have:
       - minimum length 8 characters, 
       - at least one lower and upper case letter,
       - one number and one special character.`
  }),
  validate({
    validator: "isLength",
    arguments: 8,
    message: "Password minimum lenght 8 characters is required."
  })
];

module.exports = {
  type: String,
  required: false,
  validate: passwordValidator
};
