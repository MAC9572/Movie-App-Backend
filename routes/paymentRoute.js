import express from "express";
const router = express.Router()
import Stripe from "stripe";
import { userAuth } from "../middlewares/userAuth.js";
import { Order } from "../models/orderModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const client_domain = process.env.CLIENT_DOMAIN;

router.post('/create-checkout-session', userAuth, async (req, res) => {
    const userId = req.user.id
    const { items } = req.body; // Get cart items from frontend
  
    // Create an array of line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: `Seats: ${item.seats.join(', ')}`,
        },
        unit_amount: item.totalPrice * 100, // Stripe requires the amount in cents
      },
      quantity: 1,
    }));
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${client_domain}/user/payment/success`,
        cancel_url: `${client_domain}/user/payment/cancel`,
      });

    const newOrder = new Order({ userId, sessionId: session?.id });
    await newOrder.save()

      res.json({ success: true, sessionId: session.id });
  } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
});

// router.get("/session-status", async (req, res) => {
//     try {
//         const sessionId = req.query.session_id;
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         console.log("session=====", session);

//         res.send({
//             status: session?.status,
//             customer_email: session?.customer_details?.email,
//             session_data: session,
//         });
//     } catch (error) {
//         res.status(error?.statusCode || 500).json(error.message || "internal server error");
//     }
// });


router.get("/session-status", async (req, res) => {
    try {
        const customerEmail = req.query.email;
        
        // Check if email is provided
        if (!customerEmail) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Retrieve all sessions (you may want to limit the number of sessions returned)
        const sessions = await stripe.checkout.sessions.list({
            limit: 10, // Limit sessions (you can adjust or remove this based on your needs)
        });

        // Find the session for the given email
        const session = sessions.data.find(session => session.customer_details?.email === customerEmail);

        if (!session) {
            return res.status(404).json({ error: "Session not found for this email" });
        }

        // Send back the session details
        res.send({
            status: session.status,
            customer_email: session.customer_details.email,
            session_data: session,
        });

    } catch (error) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error.message || "Internal server error" });
    }
});



export {router as paymentRouter}