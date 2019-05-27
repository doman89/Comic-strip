const router = require("express").Router();
const passport = require("passport");
const searchUser = require("./controllers/searchUser");
const getProfile = require("./controllers/getProfile");
const checkPermissions = require("./controllers/checkPermissions");
const editProfile = require("./controllers/editProfile");
const deleteProfile = require("./controllers/deleteProfile");

router.use(passport.authenticate("jwt", { session: false }));
router.get("/", searchUser);
router.get("/:id", getProfile);
router.use("/:id", checkPermissions);
router.put("/:id", editProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
