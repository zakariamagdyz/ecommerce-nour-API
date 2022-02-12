const Cart = require("../models/cartModel.js");
const factory = require("./factoryController.js");

exports.getAllCarts = factory.getAll(Cart, "userId");
exports.createACart = factory.createOne(Cart);
exports.updateOneCart = factory.updateOne(Cart);
exports.deleteOneCart = factory.deleteOne(Cart);

exports.addUserIdToCart = (req, res, next) => {
  // if admin wanna put userId manual
  if (!req.body.userId) req.body.userId = req.user.id;
  next();
};
