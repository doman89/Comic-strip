const express = require("express");
const passport = require("passport");
const userController = require("./../controllers/userController");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

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
    scope: ["email"],
    session: false
  }),
  tokenController.makeToken
);

module.exports = router;
