const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const multer = require("multer");
const passport = require("passport");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const passportSetup = require("./config/passport-config");
const mongoDBConnect = require("./database/connection");

const app = express();

mongoDBConnect();
app.use(passport.initialize());
app.use(passport.session());
app.use(multer().array());
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api/user", userRouter);

module.exports = app;
