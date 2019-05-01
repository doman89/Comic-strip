const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    author: "Mateusz Domanski",
    project: "Comic-Strip",
    company: "SoftServe"
  });
});

module.exports = router;
