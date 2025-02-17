import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { getCart,addMovieToCart,removeMovieFromCart } from "../controllers/cartController.js";

const router = express.Router()

router.get("/get-cart", userAuth, getCart);
router.post("/add-to-cart",userAuth, addMovieToCart);
router.delete("/remove-from-cart/:itemId",userAuth,removeMovieFromCart);

export {router as cartRouter}