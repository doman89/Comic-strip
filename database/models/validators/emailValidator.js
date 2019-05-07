const validate = require("mongoose-validator");

const emailValidator = [
  validate({
    validator: "isEmail",
    arguments: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Please type correct e-mail address."
  })
];

module.exports = {
  type: String,
  required: [true, "Email address is required"],
  validate: emailValidator
};
