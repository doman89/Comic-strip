const express = require("express");
const passport = require("passport");
const userController = require("./../controllers/userController");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.get(
  "/jwt",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    response.send("I'am authorized!");
  }
);

router.get(
  "/",
  passport.authenticate("local", { session: false }),
  tokenController.makeToken
);

router.post(
  "/",
  userController.isEmailUsed,
  userController.createNewUser,
  tokenController.makeToken
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  tokenController.makeToken
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
    scope: ["email"],
    session: false
  }),
  function(req, res) {
    res.send("FACEBOOK is done!!! :D");
  }
);

module.exports = router;
