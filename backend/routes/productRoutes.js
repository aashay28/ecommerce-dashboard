const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.verifyToken, productController.getAllProduct)
  .post(productController.verifyToken, productController.addProduct);

router
  .route("/:id")
  .get(productController.verifyToken, productController.findAProduct)
  .put(productController.verifyToken, productController.updateAproduct)
  .delete(productController.verifyToken, productController.deleteProduct);

router
  .route("/search/:key")
  .get(productController.verifyToken, productController.searchProduct);
module.exports = router;
