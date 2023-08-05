const { verify } = require("../../utils/jwt-util");

const authJWT = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1];

      const result = verify(token);

      if (result.ok) {
        req.id = result.userId;
        req.nick = result.nick;
        req.role = result.role;
        next();
      } else {
        res.status(401).json({
          ok: false,
          status: 401,
          message: result.message,
        });
      }
    } else {
      res.status(401).send({
        ok: false,
        status: 401,
        message: "Not Logged In",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = authJWT;
