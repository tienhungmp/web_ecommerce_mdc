const express = require("express");
const router = express.Router();
const {
  createDiscount,
  getAllDiscounts,
  getSingleDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountByName
} = require("../controllers/discountController");

const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

// Route for creating and retrieving all discounts
router.route("/")
  .post([authenticateUser, authorizePermissions("admin")], createDiscount)
  .get(getAllDiscounts);

// Route for retrieving, updating, and deleting a discount by ID
router.route("/:id")
  .get(getSingleDiscount)
  .patch([authenticateUser, authorizePermissions("admin")], updateDiscount)
  .delete([authenticateUser, authorizePermissions("admin")], deleteDiscount);

// Route for retrieving a discount by name
router.post("/name", getDiscountByName); // Add this line

module.exports = router;