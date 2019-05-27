const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const passport = require("passport");
// const indexRouter = require("./routes/index");
const authRouter = require("./features/auth/router");
const userRouter = require("./features/userProfile/router");
const friendRouter = require("./features/friends/router");
const comicRouter = require("./features/comicStrips/router");
const passportAuthenticationSetup = require("./features/auth/passport/passportAuthentication");
const passportAuthorizationSetup = require("./features/userProfile/passport/passportAuthorization");
const mongoDBConnect = require("./database/connection");

const app = express();

mongoDBConnect();
app.use(cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS"
}));
// app.options("*", cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer().array());
app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/friend", friendRouter);
app.use("/api/comic", comicRouter);

module.exports = app;
