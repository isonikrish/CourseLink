import jwt from "jsonwebtoken";

export function generateTokenandSetCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("user", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
}

export function protectUser(req, res, next) {
  try {
    const token = req.cookies.user;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized access, invalid token" });
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error("Error in protectUser middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
