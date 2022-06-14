const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    items: [
      {
        title: String,
        quantity: Number,
        size: String,
        color: String,
        price: Number,
        product: String,
      },
    ],
    amount: { type: Number, required: true },
    contact: { billing_details: Object, email: String },
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
