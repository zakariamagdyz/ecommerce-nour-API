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
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const mongoSanatize = require("express-mongo-sanitize");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use(
  cors({
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : process.env.CLIENT_SIDE_SERVER,
    credentials: true,
  })
);

// for security
const limitter = rateLimit({
  max: 300,
  windowMS: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});

app.use("/", limitter);

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//     crossOriginOpenerPolicy: false,
//     crossOriginEmpedderPolicy: false,
//   })
// );

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//    defaultSrc: ["'self'"],
//    styleSrc: ["'self'","'unsafe-inline'" ,'unpkg.com', 'cdn.jsdelivr.net',
//    'fonts.googleapis.com', 'use.fontawesome.com'],
//    scriptSrc: ["'self'","'unsafe-inline'",'js.stripe.com'],
//    frameSrc: ["'self'",'js.stripe.com'],
//    fontSrc:["'self'",'fonts.googleapis.com','fonts.gstatic.com','use.fontawesome.com','cdn. joinhoney.com']
//  }
// }));
app.use(xssClean());
app.use(mongoSanatize());

app.use(cookieParser());
app.use(compression());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/lamaApi/v1/categories", categoryRouter);
app.use("/lamaApi/v1/users", userRouter);
app.use("/lamaApi/v1/orders", orderRouter);
app.use("/lamaApi/v1/carts", cartRouter);
app.use("/lamaApi/v1/products", productRouter);

if (process.env.NODE_ENV === "production") {
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
