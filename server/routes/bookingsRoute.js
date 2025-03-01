import express from 'express';
import { fetchBookings, getBookings } from '../controllers/bookingController.js';
import 'dotenv/config'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

const bookingRouter = express.Router();

bookingRouter.post('/get-book', getBookings);
bookingRouter.post('/get-bookings', fetchBookings);

// make payment

 

export default bookingRouter;