const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "shipped", "outForDelivery"],
        message: "Please choose from ,pending,approved,shipped,outForDelivery",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
