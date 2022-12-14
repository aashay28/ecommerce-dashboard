const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Products");
const mongoose = require("mongoose");
const Products = require("./db/Products");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";
const app = express();

app.use(express.json());
app.use(cors());
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, success) => {
      if (err) {
        res.status(401).send({ message: "token is invalid" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ message: "please send response with header" });
  }
}

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
app.post("/add-product", verifyToken, async (req, res) => {
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
app.get("/all-product", verifyToken, async (req, res) => {
  const allProducts = await Product.find();
  if (Products.length > 0) {
    res.status(200).send({
      result: "product displayed sucessfully",
      data: allProducts,
    });
  } else {
    res.status(200).send({
      result: "No products to be displayed",
    });
  }
});
app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });

  res.status(200).send({
    result: "product deleted sucessfully",
    data: result,
  });
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send({
      result: "product updated sucessfully",
      data: result,
      status: 200,
    });
  } else {
    res.send({
      result: "No result found",
      status: 200,
    });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (result) {
    res.send({
      result: "product updated sucessfully",
      data: result,
      status: 200,
    });
  }
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  if (result) {
    res.send({
      result: "product found sucessfully",
      data: result,
      status: 200,
    });
  }
});

app.listen(8000);
