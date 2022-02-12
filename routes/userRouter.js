const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController");
const orderRouter = require("./orderRouter.js");
const cartRouter = require("./cartRouter.js");

const router = express.Router();

// for nested route
router.use("/:id/orders", orderRouter);
router.use("/:id/cart", cartRouter);

router.post("/active-account", authController.sendActivationToSignUp);
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.patch("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.get("/isSignedIn", authController.isSignedIn);

router.use(authController.protect);

router.get("/signOut", authController.logout);
router.get("/getMe", userController.getMe, userController.getAUser);
router.patch("/updateMyPassword", authController.updatePassword);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getUsers).post(userController.createAUser);
router
  .route("/:id")
  .get(userController.getAUser)
  .patch(userController.updateAUser)
  .delete(userController.deleteAUser);

module.exports = router;
