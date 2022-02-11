const express = require("express");
const app = require("../app.js");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/active-account").post(authController.sendActivationToSignUp);
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

router.route("/").get(userController.getUsers);
router
  .route("/:id")
  .get(userController.getAUser)
  .patch(userController.updateAUser)
  .delete(userController.deleteAUser);

module.exports = router;
