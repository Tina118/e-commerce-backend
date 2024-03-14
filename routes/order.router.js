const express = require("express");

const Order = require("../model/order.model");

const router = express.Router();

router.route("/order").post(async (req, res) => {
  try {
    const newOrder = new Order({
      email: req.body.email,
      orderId: req.body.orderId,
      products: req.body.products,
      amount: req.body.amount,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order Saved Successfully", orderId: req.body.orderId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating a user" });
  }
});

router.route("/getorder").post(async (req, res) => {
  try {
    const orders = await Order.find({ email: req.body.email });
    res
      .status(201)
      .json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating a user" });
  }
});

module.exports = router;
