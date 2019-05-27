const router = require("express").Router();
const passport = require("passport");
const { createNewUser } = require("./controllers/registrationController");
const { sendToken } = require("./controllers/tokenController");

router.get("/", passport.authenticate("local", { session: false }));
router.post("/", createNewUser);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/redirect", passport.authenticate("google"));
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false
  })
);
router.use(sendToken);

module.exports = router;
