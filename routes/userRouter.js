const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.put("/:id", (request, response) => {
  const id = Number(request.params.id);
  if (isNaN(id)) {
    response.status(500).send("Id is not a number!");
  }
  response.send(`This endpoint will be to edit user: ${id}`);
});

router.delete("/:id", (request, response) => {
  response.send("This endpoint will be for delete user");
});

module.exports = router;
