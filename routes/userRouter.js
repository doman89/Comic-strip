const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("./../controllers/userController");
const roleController = require("./../controllers/roleController");

router.use(passport.authenticate("jwt", { session: false }));
router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserProfile);

router.put("/:id", roleController.checkPermissions, userController.editUserProfile);

router.delete("/:id", roleController.checkPermissions, userController.deleteUserProfile);

module.exports = router;
