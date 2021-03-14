require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.header("authorization");
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Access denied" });
  }

  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};
