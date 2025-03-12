import { Booking } from "../models/bookingModel.js";

export const bookTicket = async (req, res) => {

    try {

  const {scheduleId, cartId } = req.body;

    // Step 1: Validation (simple check if required fields are provided)
    if (!scheduleId || !cartId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Step 2: Create a new booking document
    const newBooking = new Booking({
        scheduleId,
        cartId,
     },
     
    );
    // Step 3: Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Step 4: Return the saved booking data (or any other information as needed)
    res.status(201).json({ message: 'Booking successful', data: savedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking the ticket', error });
  }
};


export const getTickets = async (req, res) => {
  
    try {
      // Step 1: Retrieve all bookings for the given userId
      const tickets = await Booking.find().populate("scheduleId").populate("cartId")
  
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      // Step 2: Return the tickets (bookings) data
      res.status(200).json({message :"Fetching Booking Details", data: tickets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tickets', error });
    }
  };