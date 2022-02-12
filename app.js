const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const HttpError = require("./utils/HttpError.js");
const errorController = require("./controllers/errorController.js");
const userRouter = require("./routes/userRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const cartRouter = require("./routes/cartRouter.js");
const productRouter = require("./routes/productRouter.js");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/lamaApi/v1/users", userRouter);
app.use("/lamaApi/v1/orders", orderRouter);
app.use("/lamaApi/v1/carts", cartRouter);
app.use("/lamaApi/v1/products", productRouter);

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
