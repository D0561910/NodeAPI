var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fetch = require("node-fetch");

var indexRouter = require("./routes/index");
var loginRouter = require("./api/login");
var postsRouter = require("./api/posts");
var geocoderRouter = require("./api/geocoder");
var wakeUpDyno = require("./function/wakeUpDyno");
var limiter = require("./middleware/accessLimit");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  apply to all requests
app.use(limiter);

app.use("/", indexRouter);
app.use("/", loginRouter);
app.use("/", postsRouter);
app.use("/", geocoderRouter);

const DYNO_URL = "https://academicmatesworkshop.herokuapp.com/";
wakeUpDyno(DYNO_URL);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
