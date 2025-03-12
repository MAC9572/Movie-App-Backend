import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
           userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            scheduleId :{type: mongoose.Schema.Types.ObjectId, ref: "Schedule", required :true  },
            cartId :  { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export const Booking = mongoose.model("Booking", bookingSchema);