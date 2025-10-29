const mongoose = require("mongoose");

// Define Cart Schema
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: [1, "Quantity must be at least 1"], // Ensure quantity is at least 1
        },
        price: {
          type: Number,
          required: true,
        },
        warrantyIds: {
          type: [mongoose.Types.ObjectId],
          ref: "Warranty",
          default: [],
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant", // Optionally, if you have a Variant model for product options
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0, // This can be updated based on product prices and quantities
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate totalPrice whenever the cart is updated
CartSchema.pre("save", function (next) {
  // Calculate the total price of the cart
  this.totalPrice = this.products.reduce((total, productItem) => {
    return total + productItem.price * productItem.quantity;
  }, 0);
  next();
});

// Model for Cart
module.exports = mongoose.model("Cart", CartSchema);
