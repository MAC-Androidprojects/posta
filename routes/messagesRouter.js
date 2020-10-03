// require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const app = express.Router();
const jwt = require("jsonwebtoken");
const checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muhamedemadnour@gmail.com",
    pass: "medo mohamed",
  },
});

app.post("/", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!checkEmail.test(req.body.email)) {
        console.log(`This email doesn't exist in the world`);
      } else {
        if (user == null) {
          User.create({
            email: req.body.email,
            userId:
              Math.floor(Math.random() * 100) +
              Math.floor(Math.random() * 159) +
              Date.now() +
              Math.floor(Math.random() * 12) +
              Math.floor(Math.random() * 13) -
              Math.floor(Math.random() * 14),
          }).then((user) => {
            var mailOptions = {
              from: "muhamedemadnour@gmail.com",
              to: `${req.body.email}`,
              subject: "You have just signed up in our website ",
              html: `<p>Hello there , this email has just register in our website posta to confirm this email 
              please go to the following link</p><a href= "http://localhost:3000/messages/${user._id}">confirm </a>`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.end("Error happened while sending the email");
              }
            });
            res.redirect("/confirm");
          });
        } else {
          if (!user.isConfirmed) {
            var mailOptions = {
              from: "muhamedemadnour@gmail.com",
              to: `${req.body.email}`,
              subject: "You have just signed up in our website ",
              html: `<p>Hello there , this email has just register in our website posta to confirm this email 
              please go to the following link</p><a href= "http://localhost:3000/messages/${user._id}">confirm </a>`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.end("Error happened while sending the email");
              }
            });
            res.end("Please confirm your email");
          } else {
            const accessToken = jwt.sign(
              `${user.email}`,
              process.env.ACCESS_TOKEN_SECRET
            );
            res.cookie("token", accessToken, {
              httpOnly: true,
            });
            res.redirect("/home");
          }
        }
      }
    })
    .catch((err) => console.log(err));
});
app.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    if (user == null) res.end("No such a user");
    else {
      User.findOneAndUpdate(
        { email: user.email },
        { isConfirmed: true },
        function (err, result) {
          if (err) res.end("Sorry there is an error :(");
        }
      );
      res.redirect("/");
    }
  });
});
module.exports = app;
