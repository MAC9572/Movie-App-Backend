import e from "express";
import { createRating, deleteRating, getRatingsByMovie, updateRating } from "../controllers/ratingController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = e.Router();

router.post("/add-rating", userAuth, createRating);
router.get("/get-rating",getRatingsByMovie);
router.delete('/delete-rating',userAuth,deleteRating);
router.get('/update-rating',updateRating);


export { router as ratingRouter };