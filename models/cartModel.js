import mongoose from 'mongoose';

const cartItemSchema  = new mongoose.Schema({
    seats: {
      type: [String], // Array of seat numbers (e.g., ["A1", "A2"])
      required: true
    },
    totalPrice: {
      type: Number, // Total price for the selected seats
      required: true
    }
  }, { timestamps: true });
  
  // Define Cart Schema (User's cart)
  const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    items: [cartItemSchema],  // Array of selected seats and prices
  }, { timestamps: true });


export const Cart = mongoose.model('Cart', cartSchema);