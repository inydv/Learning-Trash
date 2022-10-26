const router = require("express").Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

module.exports = router;