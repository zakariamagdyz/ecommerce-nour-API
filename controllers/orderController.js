const Order = require("../models/orderModel.js");
const catchAsync = require("../utils/catchAsync.js");
const factory = require("./factoryController.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const HttpError = require("../utils/HttpError.js");

exports.getAllOrders = factory.getAll(Order, "userId");
exports.getAnOrder = factory.getOne(Order);

exports.createAnOrder = factory.createOne(Order);

exports.deleteAnOrder = factory.deleteOne(Order);

exports.updateAnOrder = factory.updateOne(Order);

exports.incomeStats = catchAsync(async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const stats = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$amount" } } },
    { $addFields: { month: "$_id", totalIncome: "$total" } },
    { $project: { _id: 0, total: 0 } },
  ]);

  res.status(200).json({ status: "success", data: { stats } });
});

exports.checkoutPayment = catchAsync(async (req, res, next) => {
  const body = {
    source: req.body.token,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (err, res) => {
    if (err) {
      return next(new HttpError(err.message, 500));
    }

    return res.status(200).json({ status: "success", data: { data: res } });
  });
});
