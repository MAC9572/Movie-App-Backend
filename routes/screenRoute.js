import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addScreen,getAllScreens,getScreenById,updateScreen } from "../controllers/screenController.js";

const router = express.Router()

//display Movies
router.get('/get-screen', getAllScreens)
router.get('/get-screen/:id', getScreenById)
router.post('/add-screen',adminAuth, addScreen)
router.put('/updateScreen/:id',adminAuth, updateScreen);



export {router as screenRouter}