const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");

require("dotenv").config();

const app = express();
sequelize.sync();

app.use(cors("*"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use(function (_, _, next) {
  const error = new Error("404 error");
  error.status = 404;
  next(error);
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("error");
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 번 포트에서 서버 대기중`);
});

module.exports = app;
