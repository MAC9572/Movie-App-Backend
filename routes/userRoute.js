import express from "express";
import { userLogin, userLogout, userProfile, userProfileUpdate, userSignup } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router()

//signup
router.post('/signup' ,userSignup)

//login
router.get('/login', userAuth, userLogin)

//profile 
router.get('/profile', userProfile)

//profile-update
router.put('/profile-update',userAuth, userProfileUpdate)

//logout
router.get('/logout',userAuth, userLogout)

//forgot-password
//change-password
//account-deactivate

export {router as userRouter}