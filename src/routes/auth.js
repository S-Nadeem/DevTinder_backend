const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { userSignupValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    userSignupValidation(req.body);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user updated succesfully");
  } catch (e) {
    res.status(400).send("ERROR : " + e.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Succesfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (e) {
    res.status(400).send("ERROR " + e.message);
  }
});
module.exports = authRouter;
