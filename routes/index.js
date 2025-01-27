import express from "express";
import { userRouter } from "./userRoute.js";
import { adminRouter } from "./adminRoute.js";
import { movieRouter } from "./movieRoute.js";
import { screenRouter } from "./screenRoute.js";
import { bookingRouter } from "./bookingRoute.js";
import { cartRouter } from "./cartRoute.js";

const router = express.Router()

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/movies', movieRouter)
router.use('/screen', screenRouter)
router.use('/bookings', bookingRouter)
router.use('/cart', cartRouter)





export {router as apiRouter}