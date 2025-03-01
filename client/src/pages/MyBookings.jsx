import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import '../resources/MyBookings.css'
import { assets } from '../assets/assets';

const MyBookings = () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const { user } = useSelector(state => state.users);
  
  const [ticketData, setTicketData] = useState([]); // Initialize as an empty array

  const fetchBooking = async () => {

    try {
      const response = await axios.post("http://localhost:4000/api/Booking/get-bookings", { user: user._id}
      );    
      setTicketData(response.data.bookings); // Set ticketData to the bookings array
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) { // Fetch bookings only if the user is logged in
      fetchBooking();
    }
  }, [isLoggedIn]); // Add isLoggedIn as a dependency

  return (
    <div className='mybookings'>
      <h1 className='booking-heading'>My Bookings</h1>
      <div className='my-bookings-inner'>
        {
          Array.isArray(ticketData) && ticketData.length > 0 ? (
            ticketData.map((ticket, index) => (
              <div key={index} className='single-ticket'>
                <div className='single-ticket-top'>
                  <div>{ticket.source}</div>
                  <div className="ticket-arrow"><img src={assets.rightarrow} alt="" /></div>
                  <div>{ticket.destination}</div>
                </div>
                <div className='single-ticket-detail'>passenger Name : <p> {ticket.passengername}</p></div>
                <div className='single-ticket-detail'>Passenger Age : <p> {ticket.passengerage}</p></div>
                <div className='single-ticket-detail'>Passenger Gender :  <p> {ticket.passengergender}</p></div>
                <div className='single-ticket-detail'>Passenger Phone :  <p> {ticket.passengeragephone}</p></div>
                <div className='single-ticket-detail'>Ticket Status : <p> {ticket.ticketStatus}</p></div>
                <div className='single-ticket-detail'>Seat Number : <p> {ticket.seats}</p></div>
                <div className='single-ticket-detail'>Journey Date : <p> {moment(ticket.date).format('DD-MM-YYYY')}</p></div>
                <div className='happy'>HAPPY JOURNEY</div>
              </div>
            ))
          ) : (
            <div>No bookings found.</div> // Handle the case where there are no bookings
          )
        }
      </div>
    </div>
  );
}

export default MyBookings;