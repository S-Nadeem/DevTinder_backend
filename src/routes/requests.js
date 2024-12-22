const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      //condition 1 check whether the user is presnt in DB
      if (!mongoose.isValidObjectId(toUserId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
      }
      const activeToUser = await User.findById(toUserId);
      if (!activeToUser) {
        return res.status(404).json({ message: "User not found in DB" });
      }
      //condition 2 it should accept only interested and ignored
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status " + status });
      }
      //condition 3
      //it should check the duplicate connection from a to b and b to a
      //$or is a mongoDB search query for multiple array of conditions
      const existingConnections = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnections)
        return res
          .status(400)
          .send({ message: "Connection Request Already Exits" });

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const connectionData = await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} is ${status} to ${activeToUser.firstName}`,
        connectionData,
      });
    } catch (e) {
      res.status(400).send("Error " + e.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(403).json({ message: "invalid Status type" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(403)
          .json({ message: "connection request is not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: `Connection request has ${status}`, data });
    } catch (e) {
      res.status(400).send("Error !" + e.message);
    }
  }
);

module.exports = requestRouter;
