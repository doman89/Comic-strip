const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("./../controllers/userController");
const roleController = require("./../controllers/roleController");

router.use(passport.authenticate("jwt", { session: false }));
router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserProfile);

router.put("/:id", (request, response) => {
  console.log(request.payload);
  response.send(`This endpoint will be to edit user: ${id}`);
});

router.delete("/:id", roleController.checkPermissions, (request, response) => {
  response.json({ error: "This endpoint will be for delete user" });
});

module.exports = router;
