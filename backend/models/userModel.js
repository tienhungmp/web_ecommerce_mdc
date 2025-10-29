const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    // Custom Validators package
    validate: {
      // validator package
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },

  phone: {
    type: String,
    required: false,
    validate: {
      validator: (value) => /^[0-9]{10}$/.test(value),
      message: "Please provide a valid phone number (10 digits starting with 0)",
    },
  },

  address: {
    type: String,
    required: false,
  },
  
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
});

// Hashed the password before saving the user into database
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("name"));
  // Only run this 👇 function if password was modified (not on other update functions)
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
