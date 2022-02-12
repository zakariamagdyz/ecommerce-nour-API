const express = require("express");
const productController = require("../controllers/productController.js");
const authController = require("../controllers/authController.js");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.use(authController.protect, authController.restrictTo("admin"));

router.post("/", productController.createAProduct);

router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.updateAProduct)
  .delete(productController.deleteAProduct);

module.exports = router;
