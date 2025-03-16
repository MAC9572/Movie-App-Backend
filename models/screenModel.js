import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    seats: { type: Array, required: true }, // Example: [["A1", "A2"], ["B1", "B2"]]
    screenType: { type: String, required: true }, // Example: "IMAX", "Standard"
    price: { type: Number, required: true },
    theatre_admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }
}, { timestamps: true });

export const Screen = mongoose.model("Screen", screenSchema);