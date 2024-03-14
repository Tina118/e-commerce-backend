const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        "shivangi123"
      ).toString(),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating a user" });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    !user && res.status(401).json({ message: "User not found" });

    const decodedPassword = CryptoJS.AES.decrypt(
      user.password,
      "shivangi123"
    ).toString(CryptoJS.enc.Utf8);

    decodedPassword !== req.body.password &&
      res.status(401).json({ message: "Wrong password" });

    const { password, ...rest } = user._doc;
    const accessToken = jwt.sign({ id: user.username }, "shivangi123");

    res.json({ ...rest, accessToken });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
