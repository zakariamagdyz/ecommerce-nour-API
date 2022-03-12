const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const HttpError = require("./utils/HttpError.js");
const errorController = require("./controllers/errorController.js");
const userRouter = require("./routes/userRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const cartRouter = require("./routes/cartRouter.js");
const productRouter = require("./routes/productRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : process.env.CLIENT_SIDE_SERVER,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/lamaApi/v1/categories", categoryRouter);
app.use("/lamaApi/v1/users", userRouter);
app.use("/lamaApi/v1/orders", orderRouter);
app.use("/lamaApi/v1/carts", cartRouter);
app.use("/lamaApi/v1/products", productRouter);

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// app.all("*", (req, res, next) => {
//   return next(
//     new HttpError(
//       `Can't find ${req.originalUrl} on this server, Please take a look at the documentation`,
//       404
//     )
//   );
// });

app.use(errorController);

module.exports = app;
