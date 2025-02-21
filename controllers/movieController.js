import { cloudinaryInstance } from "../config/cloudinary.js";
import { Movie } from "../models/movieModel.js"

export const showMovies = async (req, res, next)=>{

    try{
       const movieList = await Movie.find().select("-description -duration -cast -crew")
       res.json({data : movieList, message : "Movies fetched"})
    }
    catch(error){
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
}

export const getMovieDetails = async (req, res, next)=>{

    try{
        const {movieId} = req.params
       const movieList = await Movie.findById(movieId)
       res.json({data : movieList, message : "Movies fetched"})
    }
    catch(error){
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
}

export const addMovies = async (req, res, next)=>{

    try{
         const {title, description, movie_grade, languages, duration, genre, cast, crew,  theatre_admin } = req.body
         let cloudinaryRes

         if(!title || !description|| !movie_grade|| !languages|| !duration|| !genre){
          return res.status(400).json({message: "All fields are required"})
         }
         console.log('movie_image' , req.file);
        
         if(req.file){
         cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path)
         }
         console.log("cldRes====", cloudinaryRes);

          const adminId = req.user.id
         const movieData = new Movie({
            title, description, movie_grade, languages, duration, genre, cast, crew, movie_image : cloudinaryRes.url, theatre_admin :adminId
         })
         await movieData.save()
         return res.status(200).json({ data: movieData, message: "Movie added successfully" });
    }
    catch(error){
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
        });
    }
}


export const updateMovie = async (req, res, next) => {
    const {id} = req.params;
    const updatedData = req.body;
    try {
        let imageUrl = updatedData.image;
        if(req.file){
        const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path)
        console.log("cldRes====", cloudinaryRes);
        imageUrl = cloudinaryRes.secure_url
        }

        const updatedMovie = await Movie.findByIdAndUpdate(id, {updatedData, movie_image: imageUrl}, {new : true});
        if(!updatedMovie){
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.json({ data: updatedMovie, message: "Movie updated successfully" });
    } catch (error) {
        return res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
};


export const deleteMovie = async (req, res, next) => {
    const {id} = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        res.clearCookie("token");
        if(!deletedMovie){
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        return res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
};

