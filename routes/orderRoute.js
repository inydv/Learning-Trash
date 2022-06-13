const router = require("express").Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  UpdateOrders,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/order/me").get(isAuthenticatedUser, myOrders);

router
  .route("admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admins"), getAllOrders);

router
  .route("admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admins"), UpdateOrders)
  .delete(isAuthenticatedUser, authorizeRoles("admins"), deleteOrder);

module.exports = router;