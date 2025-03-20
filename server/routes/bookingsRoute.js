import express from 'express';
import { fetchBookings, getBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/get-book', getBookings);
bookingRouter.post('/get-bookings', fetchBookings);

// make payment

 

export default bookingRouter;
