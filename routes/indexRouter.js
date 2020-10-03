const express = require("express");
const jwt = require("jsonwebtoken");
const app = express.Router();
const auth = require("../auth");
app.get("/", homeRedirect, (req, res) => {
  res.render("index.ejs");
});
app.get("/instructions", (req, res) => {
  res.render("instructions.ejs");
});
app.get("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});
function homeRedirect(req, res, next) {
  const token = req.cookies.token;
  if (token == null) next();
  else res.redirect("/home");
}

module.exports = app;
