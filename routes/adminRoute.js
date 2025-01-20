import express from "express";
import { adminLogin, adminLogout, adminProfile, adminSignup } from "../controllers/adminControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router()

//signup
router.post('/signup' , adminSignup)

//login
router.get('/login', adminLogin)

//profile
router.get('/profile' ,adminAuth, adminProfile)
//logout
router.get('/logout' ,adminAuth, adminLogout)
//forgot-password
//change-password
//profile-update
//account-deactivate

export {router as adminRouter}