const express = require("express");
const orderController = require("../controllers/orderController.js");
const authController = require("../controllers/authController.js");

const router = express.Router({ mergeParams: true });

router.post("/", orderController.createAnOrder);
router.post("/payment", orderController.checkoutPayment);
router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router.get("/", orderController.getAllOrders);
router.get("/income", orderController.incomeStats);

router
  .route("/:id")
  .get(orderController.getAnOrder)
  .patch(orderController.updateAnOrder)
  .delete(orderController.deleteAnOrder);

module.exports = router;
