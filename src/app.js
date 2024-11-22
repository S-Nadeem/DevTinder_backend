const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("Hello world ");
});
app.get("/hello", (req, res) => {
  res.send("testing phase");
});
app.get("/profile", (req, res) => {
  res.send("nadeem phase");
});

app.listen(3000, () => {
  console.log("server listening on 3000 port");
});
