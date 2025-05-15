import Bookings from "../models/bookingModel.js";
import Bus from "../models/busModel.js";
import Payment from "../models/paymentsModel.js";
import User from "../models/usersModel.js";
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';  // Ensure uuid is imported for idempotency key

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51PJawlSFdda55wRqn2s0GRcSrHjCXteQJJEH97dGmxRtQqwwudgWtKtFUXNHpAUOTfCW6QoMSragTYNSVtfuH3zb0002TffBhk');

// Function to create a booking
const getBookings = async (req, res) => {
    const {userid, busnumber, busid, date, destination, passengers, source, startpoint, endpoint, totalPrice, seats } = req.body;
    try {
        console.log(busid, userid, busnumber);

        // Find the bus by ID
        const bus = await Bus.findById(busid);
        const user = await User.findById(userid);
        const transactionId = req.body.transactionId; 

        // Check if the bus and user were found
        if (!bus) {
            return res.status(404).send({ success: false, message: "Bus not found" });
        }
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Ensure seats is an array
        

        // Create a new booking
        const newBooking = new Bookings({
            busid: busid,
            userid: userid,
            busnumber: busnumber,
            passengers: passengers,
            source:source,
            startpoint: startpoint,
            destination: destination,
            endpoint: endpoint,
            totalprice: totalPrice,
            dat: date,
            transactionid: transactionId, // This should ideally be generated dynamically
        });

        // Save the new booking
        await newBooking.save();

        // Update the bus's seatsBooked
        await passengers.map((passenger) => {
             bus.seatsBooked.push(passenger.seats);
             console.log(passenger.seats)
        })  // Safely merge seats

        // Save the updated bus document
        await bus.save();

        console.log(bus);

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
        const { token, amount, } = req.body;

        // Create a Stripe customer using the provided token
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        // Create a payment intent (charge)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,  // amount in cents (e.g., 1000 for ₹10)
            currency: "inr",  // Ensure currency is set
            customer: customer.id,
            receipt_email: token.email,
            metadata: { integration_check: 'accept_a_payment' },
        }, {
            idempotencyKey: uuidv4(), // Ensure idempotency to avoid duplicate charges
        });

        const newPayment = new Payment({

        })


        // Check if payment was successful
        if (paymentIntent) {
            const newPayment = new Payment({
                userid: paymentIntent.receipt_email,
                txnid: paymentIntent.id,
                status:"Success",
                method: "Card",
                amount: paymentIntent.amount
            })
            const response = await newPayment.save();
            res.status(200).send({
                message: "Payment successful",
                data: response,
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
        const bookings = await Bookings.find({ userid: req.body.user });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { getBookings, fetchBookings, PaymentGateway };
