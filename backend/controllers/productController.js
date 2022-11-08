const Product = require("../model/ProductModel");
const Products = require("../model/ProductModel");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, success) => {
      if (err) {
        res.status(401).json({ message: "token is invalid" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ message: "please send response with header" });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (Products.length > 0) {
      res.status(200).json({
        result: "product displayed sucessfully",
        data: allProducts,
      });
    } else {
      res.status(200).json({
        result: "No products to be displayed",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed to Fetch",
      message: err,
    });
  }
};
exports.addProduct = async (req, res) => {
  try {
    let product = new Product(req.body);

    let result = await product.save();
    res.status(200).json({
      result: "product added sucessfully",
      data: result,
      status: 200,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed to Add",
      message: err,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      result: "product deleted sucessfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed to Delete",
      message: err,
    });
  }
};

exports.findAProduct = async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.status(200).json({
        result: "product fetched sucessfully",
        data: result,
      });
    } else {
      res.status(200).json({
        result: "No result found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed to Fetch",
      message: err,
    });
  }
};

exports.updateAproduct = async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (result) {
      res.status(200).json({
        result: "product updated sucessfully",
        data: result,
        status: 200,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed to Update",
      message: err,
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
      ],
    });
    res.status(200).json({
      result: "product found sucessfully",
      data: result,
      status: 200,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed to Update",
      message: err,
    });
  }
};
