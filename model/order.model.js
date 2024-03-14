const mongoose = require("mongoose");

const OrderScheme = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    products: {
      type: Object,
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};

const Order =  mongoose.model("Order", OrderScheme);

module.exports = Order;
