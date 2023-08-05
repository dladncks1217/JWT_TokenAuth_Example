const authJWT = require("./middlewares/authJWT");

const router = require("express").Router();

router.get("/getuser", authJWT, (req, res, next) => {
  if (req.nick) {
    res.send({ nick: req.nick, name: req.name, userId: req.id });
  }
});

module.exports = router;
