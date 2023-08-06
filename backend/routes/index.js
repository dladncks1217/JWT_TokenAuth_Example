const authJWT = require("./middlewares/authJWT");

const router = require("express").Router();

router.get("/getuser", authJWT, (req, res, next) => {
  if (req.nick) {
    res.json({ nick: req.nick, name: req.name, userId: req.id });
  }
});

router.get("/getnumber", authJWT, (_, res) => {
  res.json({ number: Math.floor(Math.random() * 10) + 1 });
});

module.exports = router;
