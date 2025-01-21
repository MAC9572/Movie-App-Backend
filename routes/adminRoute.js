import express from "express";
import { adminLogin, adminLogout, adminProfile, adminProfileUpdate, adminSignup } from "../controllers/adminControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router()

//signup
router.post('/signup' , adminSignup)

//login
router.get('/login', adminAuth, adminLogin)

//profile
router.get('/profile' ,adminAuth, adminProfile)

//profile-update
router.put('/profile-update/:id' ,adminAuth, adminProfileUpdate)

//logout
router.get('/logout' ,adminAuth, adminLogout)
//forgot-password
//change-password
//account-deactivate

export {router as adminRouter}