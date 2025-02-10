import { Movie } from "../models/movieModel.js";
import { Rating } from "../models/ratingModel.js";


export const createRating = async (req, res) => {
  try {
    const { movieId, ratings} = req.body;
    const userId = req.user.id

     // Validate if the course exists
     const movie = await Movie.findById(movieId);
     if (!movie) {
         return res.status(404).json({ message: "Movie not found" });
     }

     if (ratings.percentage > 5 || ratings.percentage <= 1) {
        return res.status(400).json({ message: "Please provide a proper rating" });
    }

     const existingRating = await Rating.findOne({userId, movieId });
    if (existingRating) {
      return res.status(400).json({ message: "User has already rated this movie." });
    }

    const rating = new Rating({
      userId,
      movieId,
      ratings,
    });

    await rating.save();
    res.status(201).json({ message: "Rating added successfully!", data : rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong while creating rating." });
  }
};

// Get ratings by movie ID
export const getRatingsByMovie = async (req, res) => {
    try {
      const { movieId } = req.params;
      const ratings = await Rating.find( movieId ).populate("userId", "name");
  
      if (!ratings) {
        return res.status(404).json({ message: "No ratings found for this movie." });
      }
  
      res.status(200).json({message : "Rating found for the movie", data :ratings});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong while fetching ratings." });
    }
  };


  // Update a rating
export const updateRating = async (req, res) => {
    try {
      const {movieId, percentage, no_of_ratings } = req.body;
      const userId = req.user.id

      const updatedRating = await Rating.findOneAndUpdate(
        { userId, movieId },
        {
          $set: {
            "rating.percentage": percentage,
            "rating.no_of_ratings": no_of_ratings,
          },
        },
        { new: true }
      );
  
      if (!updatedRating) {
        return res.status(404).json({ message: "Rating not found." });
      }
  
      res.status(200).json({ message: "Rating updated successfully!", updatedRating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong while updating rating." });
    }
  };
  
  // Delete a rating
  export const deleteRating = async (req, res) => {
    try {
      const {movieId } = req.params;
      const userId = req.user.id

  
      const deletedRating = await Rating.findOneAndDelete({ userId, movieId });
  
      if (!deletedRating) {
        return res.status(404).json({ message: "Rating not found." });
      }
  
      res.status(200).json({ message: "Rating deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong while deleting rating." });
    }
  };