const mongoose = require("mongoose");

const configConnectOptions = {
  useNewUrlParser: true,
  useFindAndModify: false
};

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URI, configConnectOptions);
  mongoose.connection
    .once("open", () => {
      console.log("Connection with database has been made.");
    })
    .on("error", error => {
      console.log("Connection error with database:", error);
    });
  mongoose.Promise = global.Promise;
};
