import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     
            movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
            screenId: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
            cartId :  { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
            bookedSeats: [String], // Example: ["A1", "A2"]
            totalPrice: { type:String, required: true , required: true },
            bookingDate: { type: Date, default: Date.now }, // Timestamp for booking}]
        
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export const Booking = mongoose.model("Booking", bookingSchema);