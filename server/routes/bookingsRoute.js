import express from 'express';
import { fetchBookings, getBookings, PaymentGateway } from '../controllers/bookingController.js';
import { getBusBookings } from '../controllers/commonController.js';

const bookingRouter = express.Router();

bookingRouter.post('/get-book', getBookings);
bookingRouter.post('/get-bookings', fetchBookings);
bookingRouter.get('/getbusbookings/:busid', getBusBookings)

bookingRouter.post('/payment', PaymentGateway)

// make payment

 

export default bookingRouter;
