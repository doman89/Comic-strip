const validate = require("mongoose-validator");

validate.extend(
  "isMax10Tags",
  array => array ? array.length <= 10 : true,
  "Comic strip can have max 10 tags"
);

const tagsValidator = [
  validate({
    validator: "isMax10Tags"
  })
];

module.exports = {
  type: [String],
  validate: tagsValidator
};
