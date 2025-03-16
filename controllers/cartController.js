import { Cart } from "../models/cartModel.js";

// Get the cart for the current user
export const getCart = async (req, res) => {
  try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ userId })

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({ cartItems: cart, message: "Showing Cart Details" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
  }
};

// Add a movie to the cart
export const addMovieToCart = async (req, res) => {
  const userId = req.user.id;
  const {seats, totalPrice } = req.body; // Make sure to include scheduleId

  if (!userId || !seats || !totalPrice) {
    return res.status(400).json({ error: 'User ID, seats, and total price are required' });
  }

  try {

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    // If no cart exists for the user, create a new cart
    if (!cart) {
      cart = new Cart({
        userId,
        items: []
      });
    }

    // Add the new seats and scheduleId to the cart
    const newItem = {seats, totalPrice };
    cart.items.push(newItem);

    // Save the updated cart
    await cart.save();

    // Send the updated cart back as response
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a movie from the cart
export const removeMovieFromCart = async (req, res) => {
  const { itemId } = req.params; // Get itemId from the URL parameters

  try {
    // Find the cart and remove the item from cartItems
    const cart = await Cart.findOne({ userId: req.user.id }); // Assuming you have user authentication in place
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item to be deleted based on itemId
    const updatedCartItems = cart.items.filter(item => item.id !== itemId);
    cart.items = updatedCartItems;

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json({
      message: 'Item deleted successfully',
      data: updatedCartItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
