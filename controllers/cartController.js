import { Cart } from "../models/cartModel.js";
import { Movie } from "../models/movieModel.js";

// Get the cart for the current user
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("movies.movieId" ,"-description -cast -crew").populate("movies.screenId", "-seats");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ data: cart, message: "Showing Cart Details" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Add a movie to the cart
export const addMovieToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId, screenId, showtime, seats, price } = req.body;

        // Validate input
        if (!movieId || !screenId || !showtime || !seats || seats.length === 0 || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Verify the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Find or create the cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, movies: [] });
        }

        // Check if the movie is already in the cart
        const movieExists = cart.movies.some(
            (item) => item.movieId.equals(movieId) && item.screenId.equals(screenId) && item.showtime === showtime
        );
        if (movieExists) {
            return res.status(400).json({ message: "Movie already in cart" });
        }

        // Add the movie to the cart
        cart.movies.push({
            movieId,
            screenId,
            showtime,
            seats,
            price,
            totalPrice: seats.length * price,
        });

        await cart.save();

        res.status(200).json({ data: cart, message: "Movie added to cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Remove a movie from the cart
export const removeMovieFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId, screenId, showtime } = req.body;

        // Validate input
        if (!movieId || !screenId || !showtime) {
            return res.status(400).json({ message: "MovieId, ScreenId, and Showtime are required" });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the movie from the cart
        cart.movies = cart.movies.filter(
            (item) =>
                !(
                    item.movieId.equals(movieId) &&
                    item.screenId.equals(screenId) &&
                    item.showtime === showtime
                )
        );

        await cart.save();

        res.status(200).json({ message: "Movie removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};