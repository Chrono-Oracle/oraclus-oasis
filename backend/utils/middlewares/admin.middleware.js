const User = require("../../src/models/User");

const { verify } = require("../lib/jwt.lib");

const getToken = (req) => {
  const authorization = req.header("Authorization");

  if (authorization) {
    const token = authorization.split(" ")[1];
    return token;

  }
  return null;
};

const adminMiddleware = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, token is missing",
      });
    }

    const verifyToken = verify(token);
    if (!verifyToken) {
      return res.status(401).json({
        message: "Unauthorized, invalid token",
      });
    }

    const id = verifyToken.id;
    const user = await User.findById(id).select(
      "_id email username role"
    );
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden, you are not an administrator",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("error: ", error);

    return res.status(500).json({
      message: "Internal Server Error, please retry later !!!",
    });
  }
};

module.exports = { adminMiddleware };