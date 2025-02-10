import express from "express";
import { userLogin, userLogout, userProfile, userProfileUpdate, userSignup, checkUser } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router()

//signup
router.post('/signup' ,userSignup)

//login
router.post('/login', userLogin)

//profile 
router.get('/profile', userAuth, userProfile)

//profile-update
router.put('/profile-update',userAuth, userProfileUpdate)

//logout
router.get('/logout',userAuth, userLogout)

//check-user
router.get("/check-user", userAuth, checkUser);


//forgot-password
//change-password
//account-deactivate

export {router as userRouter}