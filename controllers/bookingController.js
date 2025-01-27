import { Booking } from "../models/bookingModel.js";

export const bookTicket = async (req, res) => {

    try {
    const userId = req.user.id;

  const {movieId, screenId, cartId, bookedSeats, totalPrice } = req.body;

    // Step 1: Validation (simple check if required fields are provided)
    if (!userId || !movieId || !screenId || !cartId || !bookedSeats || !totalPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Step 2: Create a new booking document
    const newBooking = new Booking({
        userId,
        movieId,
        screenId,
        cartId,
        bookedSeats,
        totalPrice,
     },
     
    );
    // Step 3: Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Step 4: Return the saved booking data (or any other information as needed)
    res.status(201).json({ message: 'Booking successful', bookingDetails: savedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking the ticket', error });
  }
};


export const getTickets = async (req, res) => {
    const userId  = req.user.id; // Assuming the userId is passed as a route parameter
  
    try {
      // Step 1: Retrieve all bookings for the given userId
      const tickets = await Booking.findOne({ userId }).populate("movieId" ,"-description -cast -crew").populate("screenId", "-seats -movieSchedules")
  
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      // Step 2: Return the tickets (bookings) data
      res.status(200).json({ tickets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tickets', error });
    }
  };