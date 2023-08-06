const redisClient = require("./redis-util");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
      nick: user.nick,
      role: user.role,
    };

    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: "15m",
    });
  },
  verify: (token) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        userId: decoded.id,
        nick: decoded.nick,
        role: decoded.role,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => {
    return jwt.sign({}, secret, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
  refreshVerify: async (token, userId) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
      const data = await getAsync.get(userId);

      if (token === data) {
        try {
          jwt.verify(token, secret);
          return true;
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};
