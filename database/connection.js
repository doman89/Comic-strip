const mongoose = require("mongoose");
const userData = require("./models/userSensitiveDataSchema");
const { userRole } = require("./../shared/enums/userRole");

const configConnectOptions = {
  useNewUrlParser: true,
  useFindAndModify: false
};

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URI, configConnectOptions);
  mongoose.connection
    .once("open", () => {
      console.log("Connection with database has been made.");
      userData.countDocuments({}, (error, counter) => {
        if (!counter) {
          const admin = new userData({
            emailAddress: "admin@admin.com",
            userName: "Admin",
            password: "Admin1234!",
            userRole: userRole.ADMIN,
            visiblePublic: false
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
