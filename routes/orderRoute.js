const router = require("express").Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  mineOrders,
  getAllOrders,
  UpdateOrders,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/me").get(isAuthenticatedUser, mineOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admins"), getAllOrders);

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admins"), UpdateOrders)
  .delete(isAuthenticatedUser, authorizeRoles("admins"), deleteOrder);

module.exports = router;
