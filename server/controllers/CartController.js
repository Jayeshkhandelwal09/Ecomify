const mongoose = require("mongoose");
const Cart = require("../models/CartModel");
const User = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, image, quantity } = req.body;

    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      return res.status(400).json({ message: "Product is already in the cart" });
    }

    const cartItem = new Cart({ userId, productId, name, price, image, quantity });
    await cartItem.save();

    await User.findByIdAndUpdate(userId, { $push: { cart: cartItem._id } });

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const cartItem = await Cart.findOneAndDelete({ _id: id, userId });
    
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { cart: id } });

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error in getting cart items:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
