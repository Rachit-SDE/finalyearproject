import Bookings from "../models/bookingModel.js";
import Bus from "../models/busModel.js";
import User from "../models/usersModel.js";
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';  // Ensure uuid is imported for idempotency key

const stripe = new Stripe('sk_test_51PJawlSFdda55wRqn2s0GRcSrHjCXteQJJEH97dGmxRtQqwwudgWtKtFUXNHpAUOTfCW6QoMSragTYNSVtfuH3zb0002TffBhk');


// Function to create a booking
const getBookings = async (req, res) => {



    try {
        console.log(req.body.busid, req.body.userid, req.body.budnumber)
        // Find the bus by ID
        const bus = await Bus.findById(req.body.busid);
        const user = await User.findById(req.body.userid);
        const transactionId = await (req.body.transactionId); 
        
        // Check if the bus and user were found
        if (!bus) {
            return res.status(404).send({ success: false, message: "Bus not found" });
        }
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Create a new booking
        const newBooking = new Bookings({
            ...req.body,
            transactionId: transactionId, // This should ideally be generated dynamically
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

// Payment gateway handler
const PaymentGateway = async (req, res) => {
    try {
        const { token, amount } = req.body;

        // Create a Stripe customer using the provided token
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        // Create a payment intent (charge)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,  // amount in cents
            currency: "inr",  // Ensure currency is set
            customer: customer.id,
            receipt_email: token.email,
            metadata: { integration_check: 'accept_a_payment' },
        }, {
            idempotencyKey: uuidv4(), // Ensure idempotency to avoid duplicate charges
        });

        // Check if payment was successful
        if (paymentIntent) {
            res.status(200).send({
                message: "Payment successful",
                transactionId: paymentIntent.id,
                success: true,
            });
        } else {
            res.status(500).send({
                message: "Payment failed",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "An error occurred during the payment process.",
            error: error.message,
            success: false,
        });
    }
}

// Fetch bookings for a user
const fetchBookings = async (req, res) => {
    try {
        // Fetch bookings for a specific user
        const bookings = await Bookings.find({ userId: req.body.user });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { getBookings, fetchBookings, PaymentGateway };
