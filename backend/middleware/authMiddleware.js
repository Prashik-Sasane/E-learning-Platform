const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  // Prefer HTTP-only cookie, fallback to Authorization header
  const tokenFromCookie = req.cookies && req.cookies.token;
  const tokenFromHeader = req.header("Authorization")?.split(" ")[1];
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
