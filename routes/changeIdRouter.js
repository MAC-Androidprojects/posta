const express = require("express");
const jwt = require("jsonwebtoken");
const app = express.Router();
const auth = require("../auth");
const User = require("../models/User");

app.get("/", auth, (req, res) => {
  const token = req.cookies.token;
  let email = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  User.findOneAndUpdate(
    { email: email },
    {
      userId:
        Math.floor(Math.random() * 100) +
        Math.floor(Math.random() * 159) +
        Date.now() +
        Math.floor(Math.random() * 12) +
        Math.floor(Math.random() * 13) -
        Math.floor(Math.random() * 14),
    },
    function (err, result) {
      if (err) res.end("Sorry there is an error :(");
    }
  )
    .then(res.redirect("/home"))
    .catch((err) => console.log(err));
});
module.exports = app;
