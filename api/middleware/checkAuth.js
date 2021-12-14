const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.body.token;
  try {
    const dedcoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = dedcoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
