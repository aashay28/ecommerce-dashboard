const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body);
  if (user) {
    res.send({
      result: "login successfull",
      data: user,
      status: 200,
    });
  } else {
    res.send({ result: "Invalid Username or Password", status: 400 });
  }
});

app.listen(8000);
