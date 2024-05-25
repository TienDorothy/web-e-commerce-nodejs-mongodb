const jwt = require("jsonwebtoken");
const {
  throwAuthAccessError,
  throwAuthError,
  throwNewError,
} = require("./error");

exports.isAuth = async (req, res, next) => {
  try {
    await authenticateRequest(req);
    next();
  } catch (err) {
    next(err);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const { userId, isAdmin } = await authenticateRequest(req);
    console.log("Auth ------");
    console.log("isAdmin", isAdmin);
    if (!isAdmin) {
      throwAuthAccessError();
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const { userId, isAdmin } = await authenticateRequest(req);
    console.log("Auth isUser", userId);
    if (userId !== req.params.userId) {
      throwAuthAccessError();
    }
    next();
  } catch (err) {
    next(err);
  }
};

async function authenticateRequest(req) {
  console.log("auth>>>>>>");

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const token = authHeader.split(" ")[1].toString();
  console.log("token >>>", token, "\n");

  try {
    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;
  } catch (err) {
    console.log("err Decode", err);
    throw new Error("Invalid refresh token");
  }
}
