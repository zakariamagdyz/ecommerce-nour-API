const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController");
const router = express.Router();

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
router.patch("/deleteMe", userController.deleteMe);

module.exports = router;
