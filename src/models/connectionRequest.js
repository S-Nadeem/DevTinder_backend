const mongoose = require("mongoose");

const connectionSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ignored", "interested", "accepted", "rejected"], // Message is optional here
    },
  },
  { timestamps: true }
);
connectionSchema.index({ fromUserId: 1, toUserId: 1 });

connectionSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Connection sent to yourSelf");
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionSchema);
