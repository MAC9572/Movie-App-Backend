import express from "express";
import { adminLogin, adminLogout, adminProfile, adminProfileUpdate, adminSignup, checkAdmin } from "../controllers/adminControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router()

//signup
router.post('/signup' , adminSignup)

//login
router.post('/login', adminLogin)

//profile
router.get('/profile' ,adminAuth, adminProfile)

//profile-update
router.put('/profile-update' ,adminAuth, adminProfileUpdate)

//logout
router.get('/logout' ,adminAuth, adminLogout)
//check-admin
router.get("/check-admin", adminAuth, checkAdmin);

//forgot-password
//change-password
//account-deactivate

export {router as adminRouter}