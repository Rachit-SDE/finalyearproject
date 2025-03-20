import express from 'express';
import { fetchBookings, getBookings } from '../controllers/bookingController.js';
import { getBusBookings } from '../controllers/commonController.js';

const bookingRouter = express.Router();

bookingRouter.post('/get-book', getBookings);
bookingRouter.post('/get-bookings', fetchBookings);
bookingRouter.get('/getbusbookings/:busid', getBusBookings)

// make payment

 

export default bookingRouter;
