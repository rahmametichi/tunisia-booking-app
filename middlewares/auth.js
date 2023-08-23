const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  // extract the token
  const token = req.header("authorization");

  if (!token) {
    res.status(400).json({ msg: "You are not authorized" });
  }

  try {
    // verify token
    const decode = jwt.verify(token, process.env.SECRET_KEY);
     req.user = decode;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
