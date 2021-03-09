require("dotenv").config();
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = function (user) {
  const schema = Joi.object({
    username: Joi.string().min(8).max(16).required().label("Username"),
    email: Joi.string().max(255).required().email().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  });

  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
