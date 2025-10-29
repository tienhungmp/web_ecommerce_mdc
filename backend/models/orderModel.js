const mongoose = require("mongoose");
const validator = require("validator");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
        },
        codeWarranty: {
          type: String,
          required: false,
        },
        datesWarranty: {
          type: [{ idWarranty: String, endDate: Date }],
          default: [],
        },
        warrantyIds: {
          type: [mongoose.Types.ObjectId],
          ref: "Warranty",
          default: [],
        },
      },
    ],
    subPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
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

OrderSchema.pre("save", function (next) {
  this.subPrice = this.products.reduce((total, productItem) => {
    return total + productItem.price * productItem.quantity;
  }, 0);

  if (this.discount < 100) {
    this.totalPrice = this.subPrice * (1 - this.discount / 100);
  } else {
    this.totalPrice = this.subPrice - this.discount;
  }

  if (this.totalPrice < 0) {
    this.totalPrice = 0;
  }

  next();
});

module.exports = mongoose.model("Order", OrderSchema);
