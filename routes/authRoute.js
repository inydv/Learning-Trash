const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  refreshToken,
  resetPassword,
  verifyAccount
} = require("../controllers/authenticationController");
const { checkForRefreshToken } = require('../middleware/auth')

router.route("/logout").get(logout);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/refresh").post(checkForRefreshToken, refreshToken);

router.route("/password/reset/:token").put(resetPassword);

router.route("/verify/:token").get(verifyAccount);

module.exports = router;
