const express = require("express");
const categoryController = require("../controllers/categoriesController.js");
const router = express.Router();

router.route("/").get(categoryController.getAllCategories);

router.get("/:id/products", categoryController.getCategoryProduct);

module.exports = router;
