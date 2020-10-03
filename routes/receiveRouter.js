const express = require("express");
const app = express.Router();
const auth = require("../auth");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

app.get("/", auth, (req, res) => {
  const token = req.cookies.token;
  let email = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  User.findOne({ email: email }).then((user) => {
    if (user == null) res.end("<h1>Error happened</h1>");
    else {
      const { userId } = user;
      res.render("receive-messages.ejs", { userId: userId });
    }
  });
});
module.exports = app;
