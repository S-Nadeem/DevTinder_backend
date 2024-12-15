const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnection", userAuth, async (req, res) => {
  try {
    console.log(req.user);
    res.send(req.user.firstName + " sent a connection request");
  } catch (e) {
    req.status(400).send("Error " + e.message);
  }
});

module.exports = requestRouter;
