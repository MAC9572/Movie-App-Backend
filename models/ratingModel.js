import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    ratings: {
        percentage:{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    no_of_ratings:{
     type :Number,
     default :0
    }},
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Rating = mongoose.model("Ratings", ratingSchema)