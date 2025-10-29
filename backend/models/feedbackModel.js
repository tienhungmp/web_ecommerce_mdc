const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"]
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      match: [/^\d{10}$/, "Please provide a valid phone number"], // Validation for 10-digit phone number
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please provide a valid email address"
      ], // Email validation regex
    },
    message: {
      type: String,
      required: [true, "Please provide your message"],
      maxlength: [1000, "Message cannot be more than 1000 characters"]
    }
  },
  { timestamps: true } // Will automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
