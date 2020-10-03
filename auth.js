const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();

function authToken(req, res, next) {
  const token = req.cookies.token;
  if (token == null) res.redirect("/");
  else {
    var email = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    User.findOne({ email: email }).then((user) => {
      if (user == null) res.redirect("/");
      else next();
    });
  }
}
module.exports = authToken;
