const mongoose = require("mongoose");
const Cart = require("../models/cartModel");  // Import the Cart model (adjust path if necessary)
const Product = require("../models/productModel");  // Import the Product model (adjust path if necessary)

async function insertCartData() {
  try {
    // Connect to MongoDB (use your actual connection string)
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });



    // Create a new cart document
    const cart = new Cart({
      user: "673388a40e5fdfaf0aa2a08f",
      products: [
        {
          product: "6733948f4fc6dacb90dcdf9d",
          quantity: 2,
          price: 999,
          variant: "673399e64fc6dacb90dcdfea",
        },
      ],
    });

    // Save the cart to MongoDB
    await cart.save();

    console.log("Cart saved successfully:", cart);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Run the function
insertCartData();