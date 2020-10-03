const express = require("express");
const app = express.Router();
const auth = require("../auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muhamedemadnour@gmail.com",
    pass: "medo mohamed",
  },
});

app.get("/:id", auth, (req, res) => {
  const userId = req.params.id;
  User.findOne({ userId: userId }).then((user) => {
    if (user == null) res.end(`<h1> Wrong ID </h1>`);
    else {
      const token = req.cookies.token;
      let email = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      User.findOne({ email: email }).then((user) => {
        if (user.userId == userId) res.render("idMe.ejs", { userId: userId });
        else {
          res.render("id.ejs", { userId: userId });
        }
      });
    }
  });
});
app.post("/:id", auth, (req, res) => {
  const token = req.cookies.token;
  let email = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = req.params.id;
  User.findOne({ email: email }).then((sender) => {
    const senderId = sender.userId;
    User.findOne({ userId: userId }).then((user) => {
      if (user == null) res.end(`<h1> Wrong ID </h1>`);
      else {
        var mailOptions = {
          from: "muhamedemadnour@gmail.com",
          to: `${user.email}`,
          subject: "New message for you on posta website ",
          html: `${req.body.message}<br>You want to reply <br><a href="http://localhost:3000/id/${senderId}">reply</a>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.end("Error happened while sending the email");
          } else {
            res.end(`<h1> Your email has been sent </h1>`);
          }
        });
      }
    });
  });
});

module.exports = app;
