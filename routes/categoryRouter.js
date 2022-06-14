const express = require("express");
const categoryController = require("../controllers/categoriesController.js");
const router = express.Router();
const productRouter = require("./productRouter.js");

router.route("/").get(categoryController.getAllCategories);

router.use("/:id/products", productRouter);

module.exports = router;
