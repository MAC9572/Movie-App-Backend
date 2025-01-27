import express from "express";
import { addMovies, deleteMovie, getMovieDetails, showMovies, updateMovie } from "../controllers/movieController.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router()

//display Movies
router.get('/show-movies', showMovies)
router.get('/show-movieDetails', getMovieDetails)
router.post('/add-movies', adminAuth, upload.single("movie_image") , addMovies)
router.put('/update/:id' , adminAuth, upload.single("movie_image"), updateMovie)
router.delete('/delete/:id' , adminAuth, deleteMovie)


export {router as movieRouter}