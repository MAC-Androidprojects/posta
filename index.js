const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const messagesRouter = require("./routes/messagesRouter");
const confirmRouter = require("./routes/confirmRouter");
const homeRouter = require("./routes/homeRouter");
const receiveRouter = require("./routes/receiveRouter");
const changeId = require("./routes/changeIdRouter");
const sendRouter = require("./routes/send-messages");
const indexRouter = require("./routes/indexRouter");
const idRouter = require("./routes/idRouter");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/posta", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/", indexRouter);
app.use("/messages", messagesRouter);
app.use("/confirm", confirmRouter);
app.use("/home", homeRouter);
app.use("/receive-messages", receiveRouter);
app.use("/changeID", changeId);
app.use("/send-message", sendRouter);
app.use("/id", idRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Connected to server"));
