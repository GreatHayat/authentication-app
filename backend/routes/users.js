const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send({ message: "User already registered with given email" });
  }

  user = new User(_.pick(req.body, ["username", "email", "password"]));
  await user.save();

  res.status(201).send({ message: "User registered successfully" });
});

router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});
module.exports = router;
