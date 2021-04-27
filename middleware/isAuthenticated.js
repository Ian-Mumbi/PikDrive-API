const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send("Access denied. No token was provided.");

  try {
    const payload = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    req.user = payload;

    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
