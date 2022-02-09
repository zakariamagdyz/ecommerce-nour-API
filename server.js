const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config();

process.on("uncaughtException", function (err) {
  console.log(err.name, err.message, err.stack);
  console.log("unCaughtException ERROR 💥💢");
  process.exit(1);
});

const app = require("./app.js");

const mongoUri = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASS
);

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to DB succesfully"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Start listening on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection ERROR💥💥");
  server.close(() => {
    process.exit(1);
  });
});
