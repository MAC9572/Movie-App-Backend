import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addScreen,getAllScreens,getScreenById,getScreens,updateScreen } from "../controllers/screenController.js";

const router = express.Router()

//display Movies
router.get('/get-screen', getAllScreens)
router.get('/get-screenById/:screenId', getScreenById)
router.post('/add-screen',adminAuth, addScreen)
router.put('/updateScreen/:id',adminAuth, updateScreen);
router.get('/get-screenById', adminAuth, getScreens)



export {router as screenRouter}