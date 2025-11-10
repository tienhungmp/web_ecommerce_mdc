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
  createOrderWithVnpay,
  updatePaymentStatus
} = require("../controllers/orderController");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllOrders)
  .post(authenticateUser, createOrder);

router
  .route("/guest").post(createOrder);
  
router.route("/payment_vnpay").post(createOrderWithVnpay);

router.route("/my_orders").get(authenticateUser, getOrderCurrentUser);


router.route("/delete/:id").delete(deleteOrder);

router.route("/update-payment-status/:id").patch(updatePaymentStatus);

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
