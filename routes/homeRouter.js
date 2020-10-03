require("dotenv").config();
const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth");

app.get("/", auth, (req, res) => {
  const token = req.cookies.token;
  let email = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  res.render("home.ejs", { email: email });
});

module.exports = app;
