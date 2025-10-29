const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a discount name"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Please provide discount type"],
    },
    value: {
      type: Number,
      required: [true, "Please provide discount value"],
    },
    validFrom: {
      type: Date,
      required: [true, "Please provide discount start date"],
    },
    validUntil: {
      type: Date,
      required: [true, "Please provide discount end date"],
    },
    description: {
      type: String,
      required: false,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", DiscountSchema);
