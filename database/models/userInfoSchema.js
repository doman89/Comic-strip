const monoogse = require("mongoose");

const Schema = monoogse.Schema;

const UserInfoSchema = new Schema({
  userId: Schema.prototype.ObjectId
});

const UserInfo = monoogse.model("userInfo", UserInfoSchema);

module.exports = UserInfo;
