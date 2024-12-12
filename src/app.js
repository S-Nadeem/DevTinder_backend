const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user updated succesfully");
  } catch (e) {
    res.status(400).send("User data has not been saved" + e.message);
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (e) {
    res.status(400).send("cant able to find the user " + e.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const userDocuments = await User.find({});
    res.send(userDocuments);
  } catch (e) {
    res
      .status(404)
      .send("no user documents found in the database " + e.message);
  }
});
app.get("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user has been deleted Succesfully");
  } catch (e) {
    res.status(400).send("Cant able to find the user: " + e.message);
  }
});
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
    const ALLOWED_UPDATES = [
      "userId",
      "skills",
      "photoUrl",
      "about",
      "gender",
      "age",
    ];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdates) {
      throw new Error("Updates not allowed");
    }
    if(data?.skills.length > 10){
      throw new Error("you cant add the skills not more than 10")
    }
    if(data?.about.length > 300){
      throw new Error("About should not more than 300 characters")
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user has been updated succesfully");
  } catch (e) {
    res.status(400).send("Something went wrong: " + e.message);
  }
});
connectDB()
  .then(() => {
    console.log("connection to database has been established");
    app.listen(3000, () => {
      console.log("server listening on 3000 port");
    });
  })
  .catch((err) => {
    console.error("connection has not been established");
  });
