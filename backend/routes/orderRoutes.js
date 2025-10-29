const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  createOrder,
  getOrderCurrentUser,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  getOrdersByStatus,
  getAllOrders,
} = require("../controllers/orderController");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllOrders)
  .post(authenticateUser, createOrder);
  router
  .route("/guest").post(createOrder);

router.route("/my_orders").get(authenticateUser, getOrderCurrentUser);

router
  .route("/:id")
  .get(getSingleOrder)
  .delete(authenticateUser, authorizePermissions("admin"), deleteOrder);

router
  .route("/status/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateOrderStatus);

router
  .route("/order_by_status/:status")
  .get([authenticateUser, authorizePermissions("admin")], getOrdersByStatus);

module.exports = router;
