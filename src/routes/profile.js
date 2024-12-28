const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { userEditValidation } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR : " + e.message);
  }
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!userEditValidation(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInuser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
    await loggedInuser.save();

    res.json({
      message: `${loggedInuser.firstName}, your profile was updated succesfully`,
      data: loggedInuser,
    });
  } catch (e) {
    res.status(400).send("ERROR : " + e.message);
  }
});

module.exports = profileRouter;
