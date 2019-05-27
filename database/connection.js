const mongoose = require("mongoose");
const userSensitiveDataSchema = require("./models/userSensitiveDataSchema");
const { userRoleEnums } = require("./../controllers/roleController");

const configConnectOptions = {
  useNewUrlParser: true,
  useFindAndModify: false
};

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URI, configConnectOptions);
  mongoose.connection
    .once("open", () => {
      console.log("Connection with database has been made.");
      userSensitiveDataSchema.countDocuments({}, (err, cnt) => {
        if (!cnt) {
          const admin = new userSensitiveDataSchema({
            emailAddress: "admin@admin.com",
            userName: "Admin",
            password: "Admin1234!",
            userRole: userRoleEnums.ADMIN
          });
          admin.save().then(console.log("Admin account was created!"));
        }
      });
    })
    .on("error", error => {
      console.log("Connection error with database:", error);
    });
  mongoose.Promise = global.Promise;
};
