const router = require("express").Router();
const passport = require("passport");
const findComicStrip = require("./controllers/findComicStrip");
const newComicStrip = require("./controllers/newComicStrip");
const getComicStrip = require("./controllers/getComicStrip");
const showComicStrip = require("./controllers/showComicStrip");
const deleteComicStrip = require("./controllers/deleteComicStrip");
const editComicStrip = require("./controllers/editComicStrip");

router.use(passport.authenticate("jwt", { session: false }));
router.get("/", findComicStrip);
router.post("/", newComicStrip);
router.use("/:id", getComicStrip);
router.get("/:id", showComicStrip);
router.delete("/:id", deleteComicStrip);
router.put("/:id", editComicStrip);

module.exports = router;
