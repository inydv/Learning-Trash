const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authenticationController");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

module.exports = router;
