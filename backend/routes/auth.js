const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const redisClient = require("../utils/redis-util");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("../utils/jwt-util");
const { verify, refreshVerify, sign } = require("../utils/jwt-util");

router.post("/join", async (req, res, next) => {
  const { email, nick, password, name } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.json("이미 가입된 이메일입니다.");
    }
    console.time("암호화 시간 확인용");
    const hash = await bcrypt.hash(password, 12);
    console.timeEnd("암호화 시간 확인용");
    const userData = await User.create({
      email,
      nick,
      password: hash,
      name,
    });

    return res.json(userData);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const exUser = await User.findOne({ where: { email } });

  if (exUser) console.log("exUser" + exUser.nick);
  if (exUser) {
    const result = await bcrypt.compare(password, exUser.password);
    if (result) {
      const tokenData = {
        id: exUser.id.toString(),
        nick: exUser.nick,
        name: exUser.name,
      };

      const accessToken = jwt.sign(tokenData);
      const refreshToken = jwt.refresh();

      redisClient.set(tokenData.id.toString(), refreshToken);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).send({
        ok: true,
        data: {
          accessToken,
        },
      });
    } else {
      res.status(401).send({
        ok: false,
        message: "wrong password",
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: "없는 사용자입니다.",
    });
  }
});

router.post("/reissuance", async (req, res) => {
  console.log(req.header.cookie);
  if (req.headers.authorization && req.headers.cookie) {
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers.cookie.split("=")[1];

    const authResult = verify(accessToken);

    const decoded = jsonwebtoken.decode(accessToken);

    if (decoded === null) {
      res.status(401).send({
        ok: false,
        message: "No authorized!",
      });
    }

    const refreshResult = await refreshVerify(refreshToken, decoded.id);

    if (authResult.ok === false && authResult.message === "jwt expired") {
      if (refreshResult.ok === false) {
        res.status(401).send({
          ok: false,
          message: "No authorized",
        });
      } else {
        const new_accessToken = sign({
          id: decoded.id,
          nick: decoded.nick,
          name: decoded.name,
        });

        res.status(200).send({
          ok: true,
          data: {
            accessToken: new_accessToken,
            userId: decoded.id,
            nick: decoded.nick,
            name: decoded.name,
          },
        });
      }
    }
  } else {
    res.status(403).send({
      ok: false,
      error: "토큰이 없습니다.",
    });
  }
});

module.exports = router;
