import Bookings from "../models/bookingModel.js";
import Bus from "../models/busModel.js";
import User from "../models/usersModel.js";





const getBookings = async (req, res) => {


    try {
        // Find the bus by ID
        const bus = await Bus.findById(req.body.bus);
        const user = await User.findById(req.body.user);
;        
        // Check if the bus was found
        if (!bus) {
            return res.status(404).send({ success: false, message: "Bus not found" });
        }
        if(!user){
            return res.status(404).send({ success: false, message: "User not found" });
        }

        console.log(bus);

        // Create a new booking
        const newBooking = new Bookings({
            ...req.body,
            transactionId: '1234', // This should ideally be generated dynamically
        });

        // Save the new booking
        await newBooking.save();

        // Update the bus's seatsBooked
        bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];

        // Save the updated bus document
        await bus.save();

        // Send a success response
        res.status(201).send({ success: true, message: "Booking Successfully", newBooking });
    } catch (error) {
        // Send an error response
        res.status(400).send({ success: false, message: error.message });
    }
}


const fetchBookings = async(req, res) => {

    try {
        const bookings = await Bookings.find({userid:req.body.user} );
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export{getBookings, fetchBookings}
