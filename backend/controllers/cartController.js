const Cart = require("../models/cartModel"); // Assuming Cart model is in the 'models' directory
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  const { productId, quantity, price, variantId, warrantyIds} = req.body;
  const userId = req.user.userId // Assuming user is authenticated and their ID is in req.user._id

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart, create a new one
      cart = new Cart({
        user: userId,
        products: [],
        totalPrice: 0,
      });
    }

    // Check if the product is already in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (productIndex !== -1) {
      // Product already in cart, update the quantity
      cart.products[productIndex].quantity += quantity;
      cart.products[productIndex].warrantyIds = warrantyIds;
    } else {
      // Add new product to the cart
      cart.products.push({
        product: productId,
        quantity,
        price,
        warrantyIds:warrantyIds,
        variant: variantId || null, // Optional if variant exists
      });
    }

    // Save the cart and recalculate the total price
    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId.toString()
    );

    // Save the updated cart
    await cart.save();
    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // Update product quantity
    cart.products[productIndex].quantity = quantity;

    // Save the updated cart and recalculate the total price
    await cart.save();
    return res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateMultipleCartProducts = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Lặp qua tất cả sản phẩm và cập nhật số lượng
    for (let { productId, quantity } of products) {
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not in cart` });
      }

      // Cập nhật số lượng sản phẩm
      cart.products[productIndex].quantity = quantity;
    }

    // Lưu giỏ hàng cập nhật và tính lại tổng giá trị
    const updatedCart = await cart.save();
    const totalPrice = updatedCart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    return res.status(200).json({
      message: "Cart updated",
      cart: updatedCart,
      totalPrice: totalPrice.toLocaleString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];

    cart.totalPrice = 0;

    await cart.save();

    return res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  updateMultipleCartProducts,
  getCart,
  clearCart,
};
