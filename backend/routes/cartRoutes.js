const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  updateMultipleCartProducts,
  getCart,
  clearCart
} = require("../controllers/cartController");


router
  .route("/")
  .get(authenticateUser, getCart)
  .post(authenticateUser, addToCart);

router
  .route("/update")
  .patch(authenticateUser, updateCartQuantity)
  .post(authenticateUser,updateMultipleCartProducts);

router
  .route("/remove")
  .delete(authenticateUser, removeFromCart);

router
  .route("/clear")
  .delete(authenticateUser, clearCart);

module.exports = router;
