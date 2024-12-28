const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decodedUsertoken = jwt.verify(token, "DevTInder!@#$%");
    const { _id } = decodedUsertoken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user is not valid");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("ERROR : " + e.message);
  }
};

module.exports = {
  userAuth,
};
