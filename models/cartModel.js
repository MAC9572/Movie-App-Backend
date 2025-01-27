import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movies: [
        {
            movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
            screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
            showtime: { type: String, required: true },
            seats: [{ type: String, required: true }],
            price: { type: Number, required: true },
            totalPrice: { type: Number, required: true, default :0 },
        }
    ]
}, { timestamps: true });

CartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.courses.reduce((total, course) => total + course.price, 0);
    return totalPrice;
};

export const Cart = mongoose.model('Cart', CartSchema);