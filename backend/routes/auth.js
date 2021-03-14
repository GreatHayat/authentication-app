const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send({ message: "Invalid Login Credentials" });
    return;
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    res.status(400).send({ message: "Invalid Login Credentials" });
  }
  const token = user.getAuthToken();
  res.status(200).send({ token, email: user.email });
});

module.exports = router;
