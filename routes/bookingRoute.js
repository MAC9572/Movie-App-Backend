import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { bookTicket, getTickets } from "../controllers/bookingController.js";

const router = express.Router()

//display Movies
router.get('/get-ticket',userAuth,getTickets )
router.post('/book-ticket',userAuth,bookTicket )



export {router as bookingRouter}