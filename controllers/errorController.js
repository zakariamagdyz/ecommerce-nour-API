const HttpError = require("../utils/HttpError");

const handleValidationErrorDB = (err) => {
  const errsArray = Object.values(err.errors).map((err) => err.message);
  const message = `Invalid Data: ${errsArray.join(". ")}`;
  return new HttpError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new HttpError(message, 400);
};

const handleDupplicatErrorDB = (err) => {
  const message = `Invalid dupplicate value:${err.keyvalue.name}, Please try another value`;
  return new HttpError(message, 400);
};

const handleJWTERROR = () => {
  const message = "Invalid token. Please login again!";
  return new HttpError(message, 401);
};

const handleJWTExpired = () => {
  const message = `Your token is expired, Please login again!`;
  return new HttpError(message, 401);
};

////////////////////////////////////////

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }

  console.error("ERROR 💥💥", error);
  res
    .status(err.statusCode)
    .json({ status: err.status, message: "Something went wrong." });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);

    // handle mongoose and mongo's errors
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDupplicatErrorDB(error);
    // handle JWT errors
    if (err.name === "JsonWebTokenError") error = handleJWTERROR();
    if (err.name === "TokenExpiredError") error = handleJWTExpired();

    return sendErrorProd(error, res);
  }

  sendErrorDev(err, res);
};
