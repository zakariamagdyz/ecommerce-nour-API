const Product = require("../models/productModel.js");
const factory = require("./factoryController.js");
const catchAsync = require("../utils/catchAsync.js");
const ApiFeature = require("../utils/ApiFeatures.js");

exports.createAProduct = factory.createOne(Product);
exports.updateAProduct = factory.updateOne(Product);

exports.deleteAProduct = factory.deleteOne(Product);

exports.getOneProduct = factory.getOne(Product);

exports.getAllProducts = factory.getAll(Product);
