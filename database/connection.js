const mongoose = require("mongoose");
const userSensitiveDataSchema = require("./models/userSensitiveDataSchema");

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
          //TODO: Create admin when database is empty
          //     console.log("Database hasn't any record!");
        }
      });
    })
    .on("error", error => {
      console.log("Connection error with database:", error);
    });
  mongoose.Promise = global.Promise;
};
