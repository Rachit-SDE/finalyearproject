import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../resources/Booknow.css";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import SeatSelection from "../components/SeatSelection";
import StripeCheckout from "react-stripe-checkout";
import { assets } from "../assets/assets";
import {message} from "antd"
import moment from 'moment';


import { useSelector } from "react-redux";

const BookNow = () => {
  const { source, destination, date } = useSelector((state) => state.search) 
  const params = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bus, setBus] = useState("");
  const dispatch = useDispatch();
  console.log(bus)

  function calculateTicketPrice(pick, drop) {
    // Check if bus and bus[0] are defined
    if (!bus) {
      return null; // Return null if bus or bus[0] is not defined
    }
  
    // Condition 1: Direct Source to Destination match
    if (pick === bus.source && drop === bus.destination) {
      return bus.price;
    }
  
    // Condition 2: Source is in stops and Destination is bus destination
    if (bus.stops && bus.stops.some(stop => stop.name === pick) && drop === bus.destination) {
      const stop = bus.stops.find(stop => stop.name === pick);
      return bus.price - stop.price;  // Adding the stop price
    }
  
    // Condition 3: Source is bus source and Destination exists in stops
    if (pick === bus.source && bus.stops && bus.stops.some(stop => stop.name === drop)) {
      const stop = bus.stops.find(stop => stop.name === drop);
      return stop.price;  // Adding the stop price
    }
  
    // Condition 4: Both Source and Destination exist in stops
    if (bus.stops && bus.stops.some(stop => stop.name === pick) && bus.stops.some(stop => stop.name === drop)) {
      const sourceStop = bus.stops.find(stop => stop.name === pick);
      const destStop = bus.stops.find(stop => stop.name === drop);
      return destStop.price - sourceStop.price;  // Adding the stop prices
    }
  
    return console.log("error"); // In case no valid conditions are met
  }
  

  const priceCalculation = calculateTicketPrice(source, destination);
  console.log(priceCalculation);

  
  const [passengername, setPassengerName] = useState("");
  const [passengerage, setPassengerAge] = useState("");
  const [passengerphone, setPassengerPhone] = useState("");
  const [passengergender, setPassengerGender] = useState("");
  const [passengeradhar, setPassengerAdhar] = useState("");
  
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");

  const [passengers, setPassengers] = useState([]);

  const data = {};

  passengers.forEach(obj => {
      data[obj.key] = obj.value;
  });

  console.log(data);

     const addPassenger = (e) => {
      e.preventDefault();
      
      setPassengers([...passengers, {
        passengername: passengername,
        passengerage: passengerage,
        passengerphone: passengerphone,
        passengergender: passengergender,
        passengeradhar: passengeradhar,
        source:source,
        destination: destination,
        price: price,
        date: date,
        seats: seats, 
      }]);
      setShowForm(false);
      

    };
    const bookTicket = async () => {

      try {
        dispatch(ShowLoading());
          const response = await axios.post('http://localhost:4000/api/Booking/get-book', { 
          bus: bus._id,
          passengername: passengername,
          passengerage: passengerage,
          passengerphone: passengerphone,
          passengergender: passengergender,
          passengeradhar: passengeradhar,
          source:bus.source,
          destination: bus.destination,
          price: price,
          date: date,
          seats: selectedSeats, 
        });
          message.success('Booking successful:', response.data);
          dispatch(HideLoading());
          fetchBus();
      } catch (error) {
          console.error('Error booking tickets:', error);
      }
  };
  const onToken = async (token) => {
    console.log(token);
  };
  const fetchBus = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/bus/get-bus-by-id/${params.id}`
      );
      setBus(response.data.bus);
      setSource(response.data.source);
      setDestination(response.data.destination);
      setDate(moment(response.data.date));
      setPrice(response.data.price)
    } catch (error) {
      dispatch(HideLoading());
    }
  };
  useEffect(() => {
    fetchBus();
  }, []);

  return (
    <div className="booknow">
      <div className="booknow-main">
        <div className="booknow-left">
          <div className="booknow-left-busdetails">
            <p className="bus-name">{bus.busname}</p>
            <p className="bus-constant">Bus Number: {bus.busnumber}</p>
            <p className="bus-constant">Bus Type: {bus.bustype}</p>
            <p className="bus-constant">source: {source}</p>
            <p className="bus-constant">destination: {destination}</p>
            <p className="bus-constant">price:</p>
            <p className="bus-constant">Bus Fare: {bus.price}</p>
            <p className="bus-constant">Journey Date: {moment(bus.date).format('DD-MM-YYYY')}</p>
            <p className="bus-leftseats">{bus.availableseats - (bus.seatsBooked?.length || 0)} Seats Left</p>
          </div>
          
          <div className="booknow-left-passenger">
            <div className="booknow-left-passenger-form">
            <div className="passenger-details-heading">
                      Enter passenger Details
                    </div>
                    <div className="member-input-sections">
                      <div className="member-input-sections-inputs">
                        <label htmlFor="">Name :</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Member Name"
                          value={passengername}
                          onChange={(e) => setPassengerName(e.target.value)}
                        />
                      </div>
                      <div className="member-input-sections-inputs">
                        <label htmlFor="">Age :</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Member Age"
                          value={passengerage}
                          onChange={(e) => setPassengerAge(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="member-input-sections">
                      <div className="member-input-sections-inputs">
                        <label htmlFor="">Phone Number :</label>
                        <br />
                        <input
                          type="text"
                          placeholder="phone Number"
                          value={passengerphone}
                          onChange={(e) => setPassengerPhone(e.target.value)}
                          className="input"
                        />
                      </div>
                      <div className="member-input-sections-inputs">
                        <label htmlFor="">Gender :</label>
                        <br />
                        <select
                          onChange={(e) => setPassengerGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="member-input-sections">
                      <div className="member-input-sections-inputs">
                        <label htmlFor="">Phone Number :</label>
                        <br />
                        <input
                          type="text"
                          placeholder="phone Number"
                          value={passengeradhar}
                          onChange={(e) => setPassengerAdhar(e.target.value)}
                          className="input"
                        />
                      </div>
                      <div className="member-input-sections-inputs">
                        <label htmlFor="">Gender :</label>
                        <br />
                        <div value = {seats} onChange={(e) => setSeats(e.target.value)}>{selectedSeats}</div>
                      </div>
                    </div>
              <div className="passenger-form">
              </div>
            </div>
          </div>
          <div>
            <div className="bus-seat-button">
          <div>
            <h4>
              Selected Seats : {selectedSeats.join(", ")}
            </h4>
            <h4>
              <b>Total Price: ₹{bus.price * selectedSeats.length} /-</b>
            </h4>
            
          </div>
            <StripeCheckout
              token={onToken}
              stripeKey="pk_test_51PJawlSFdda55wRqALZehfejpABFyGCbL2a9hVBW0DbVQd6pDoXtgFIWUxum4ee0Usx2oj29okSJ1uLGBk3E01Z200d8y2N4uO"
            >
              
            </StripeCheckout>
            <button
                className={`bus-booked-button ${
                  selectedSeats.length === 0 && "disabled"
                }`} onClick= {() => {bookTicket()}}
              >
                book Now
              </button>
          </div>
          </div>

          <div className="bus-seats-info">
            
            <img src={assets.constantchair} alt="" /><span> Management Seat</span><br />
            <img src={assets.selectseat} alt="" /><span> Selected Seat</span><br />
            <img src={assets.availableseat} alt="" /><span> Available Seat</span><br />
            <img src={assets.bookedseat} alt="" /><span> Pre Booked Seat</span><br />
          </div>
        </div>
        <div className="booknow-right">
          <SeatSelection
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            bus={bus}
          />
        </div>
      </div>
    </div>
  );
};

export default BookNow;
