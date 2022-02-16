const Category = require("../models/categoryModel.js");
const Product = require("../models/productModel.js");
const factory = require("./factoryController.js");
const catchAsync = require("../utils/catchAsync.js");
const {
  Types: { ObjectId },
} = require("mongoose");

exports.getAllCategories = factory.getAll(Category);

exports.getCategoryProduct = catchAsync(async (req, res, next) => {
  const pipeline = [{ $match: { category: ObjectId(req.params.id) } }];

  if (req.query.sort) {
    pipeline.push(getSortStage(req));
  }

  if (req.query.size) pipeline.push(getMatchStage(req));

  if (req.query.color) pipeline.push(getMatchStage(req));

  const products = await Product.aggregate(pipeline);

  res
    .status(200)
    .json({ status: "success", results: products.length, data: { products } });
});

function getSortStage(req) {
  if (req.query.sort === "price") {
    return { $sort: { price: 1 } };
  }
  if (req.query.sort === "-price") {
    return { $sort: { price: -1 } };
  }

  return { $sort: { createdAt: -1 } };
}

function getMatchStage(req) {
  if (req.query.color && req.query.size) {
    return {
      $match: {
        info: {
          $elemMatch: { "colors.color": req.query.color, size: req.query.size },
        },
      },
    };
  }

  if (req.query.color) {
    return {
      $match: { "info.colors.color": req.query.color },
    };
  }

  if (req.query.size)
    return {
      $match: { "info.size": req.query.size },
    };
}
