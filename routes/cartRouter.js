const express = require("express");
const authController = require("../controllers/authController.js");
const cartController = require("../controllers/cartController.js");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(cartController.getAllCarts)
  .post(cartController.addUserIdToCart, cartController.createACart);

router
  .route("/:id")
  .patch(cartController.updateOneCart)
  .delete(cartController.deleteOneCart);

module.exports = router;
