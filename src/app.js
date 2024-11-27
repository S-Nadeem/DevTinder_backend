const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.post("/signup",async(req,res)=>{
  const user = new User({
    firstName:"Nadeem",
    lastName:"Shaik",
    emailId:"nadeem.shaik227@gmail.com",
    password:"Nadeem@167"
  })
  try{
    await user.save() 
    res.send("user updated succesfully")
  }catch(e){
    res.status(400).send("User data has not been saved" + e.message)
  }
})
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
