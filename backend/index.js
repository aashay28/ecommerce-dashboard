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
  const result = await user.save();
  res.send(result);
});

app.listen(8000);
