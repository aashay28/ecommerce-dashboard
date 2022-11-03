const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Products");
const mongoose = require("mongoose");
const Products = require("./db/Products");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send({
    result: "login successfull",
    data: result,
    status: 200,
  });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
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
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);

  if (product) {
    let result = await product.save();
    res.send({
      result: "product added sucessfully",
      data: result,
      status: 200,
    });
  } else {
    res.send({ result: "Invalid Username or Password", status: 400 });
  }
});
app.get("/all-product", async (req, res) => {
  const allProducts = await Product.find();
  if (Products.length > 0) {
    res.send({
      result: "product added sucessfully",
      data: allProducts,
      status: 200,
    });
  } else {
    res.send({
      result: "No products to be displayed",
      status: 200,
    });
  }
});

app.listen(8000);
