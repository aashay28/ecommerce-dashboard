const express = require("express");
const cors = require("cors");
require("./model/config");
const User = require("./model/User");
const Product = require("./model/ProductModel");
const mongoose = require("mongoose");
const Products = require("./model/ProductModel");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";
const app = express();

const productRouter = require("./routes/productRoutes");

app.use(express.json());
app.use(cors());

app.use("/product", productRouter);
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Please try after sometime", status: 400 });
    }
    res.send({
      result: "registered successfull",
      data: result,
      auth: token,
      status: 200,
    });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Please try after sometime", status: 400 });
        }
        res.send({
          result: "login successfull",
          data: user,
          auth: token,
          status: 200,
        });
      });
    } else {
      res.send({ result: "Invalid Username or Password", status: 400 });
    }
  }
});

app.listen(8000);
