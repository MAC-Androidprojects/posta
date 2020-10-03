const express = require("express");
const auth = require("../auth");
const app = express.Router();
const User = require("../models/User");
app.use(auth);
app.get("/", (req, res) => {
  res.render("send-message.ejs");
});
app.post("/", (req, res) => {
  const userId = req.body.id;
  User.findOne({ userId: userId }).then((user) => {
    if (user == null) res.end("No such user");
    else {
      res.redirect(`/id/${user.userId}`);
    }
  });
});

module.exports = app;
