const Product = require("../models/productModel.js");
const factory = require("./factoryController.js");
const catchAsync = require("../utils/catchAsync.js");
const ApiFeature = require("../utils/ApiFeatures.js");

exports.createAProduct = factory.createOne(Product);
exports.updateAProduct = factory.updateOne(Product);

exports.deleteAProduct = factory.deleteOne(Product);

exports.getOneProduct = factory.getOne(Product);

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let products;
  if (req.query.category) {
    const feature = new ApiFeature(
      Product.find({ categories: { $in: [req.query.category] } }),
      req.query
    )
      .sorting()
      .limitingFields()
      .pagination();

    products = await feature.query;
  } else {
    const feature = new ApiFeature(Product.find(), req.query)
      .sorting()
      .filter()
      .limitingFields()
      .pagination();

    products = await feature.query;
  }

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});
