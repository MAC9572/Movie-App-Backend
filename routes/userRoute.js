import express from "express";
import { userLogin, userLogout, userProfile, userSignup } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router()

//signup
router.post('/signup' ,userSignup)

//login
router.get('/login', userLogin)

//profile 
router.get('/profile',userAuth, userProfile)
//logout
router.get('/logout',userAuth, userLogout)

//forgot-password
//change-password
//profile-update
//account-deactivate

export {router as userRouter}