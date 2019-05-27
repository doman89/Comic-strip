const router = require("express").Router();
const passport = require("passport");
const getAllFriends = require("./controllers/getAllFriends");
const showAllFriends = require("./controllers/showAllFriends");
const addFriend = require("./controllers/addFriend");
const deleteFriend = require("./controllers/deleteFriend");

router.use(passport.authenticate("jwt", { session: false }));

router.use(getAllFriends);
router.get("/", showAllFriends);
router.post("/:id", addFriend);
router.delete("/:id", deleteFriend);

module.exports = router;
