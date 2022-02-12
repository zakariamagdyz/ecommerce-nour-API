const Order = require("../models/orderModel.js");
const catchAsync = require("../utils/catchAsync.js");
const factory = require("./factoryController.js");

exports.getAllOrders = factory.getAll(Order);
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
