const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorController = require("./controllers/errorController.js");
const userRouter = require("./routes/userRouter.js");
const HttpError = require("./utils/HttpError.js");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/lamaApi/v1/users", userRouter);

app.all("*", (req, res, next) => {
  return next(
    new HttpError(
      `Can't find ${req.originalUrl} on this server, Please take a look at the documentation`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
