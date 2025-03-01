import React, { useState } from 'react';
import '../resources/Addbus.css';
import axios from 'axios';
import { message } from "antd";
import { assets } from '../assets/assets'

const Addbus = () => {
    const [busname, setBusName] = useState('');
    const [busnumber, setBusNumber] = useState('');
    const [bustype, setBusType] = useState('');
    const [totalseats, setTotalSeats] = useState('');
    const [availableseats, setAvailableSeats] = useState('');
    const [price, setPrice] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [arivaltime, setArivaltime] = useState('');
    const [departuretime, setDepartureTime] = useState('');
    const [date, setDate] = useState('');
    const [stoppageName, setStoppageName] = useState('');
    const [stoppagePrice, setStoppagePrice] = useState('');
    const [stoppageArivalTime, setStoppageArivalTime] = useState('');
    const [stops, setStops] = useState([]);

    const handleAddStoppage = () => {
        if (stoppageName && stoppagePrice && stoppageArivalTime) {
            setStops([...stops, { name: stoppageName, price: stoppagePrice, arivaltime: stoppageArivalTime }]);
            setStoppageName('');
            setStoppagePrice('');
            setStoppageArivalTime('');
        }
    };

    const handleAddBus = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/bus/addbus', {
                busname,
                bustype,
                totalseats,
                availableseats,
                price,
                source,
                destination,
                arivaltime, // Include arivaltime
                departuretime,
                date, // Include departuretime
                stops,
                busnumber
            });
            if (response.data.success) {
                message.success(response.data.message);
                clearFields();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const clearFields = () => {
        setBusName('');
        setBusNumber('');
        setBusType('');
        setDate('');
        setTotalSeats('');
        setSource('');
        setAvailableSeats('');
        setPrice('');
        setDestination('');
        setArivaltime('');
        setDepartureTime('');
        setStops([]); // Clear stoppages as well
    };

    return (
        <div>
            <div className='addbus'>
                <h3 className='addbus-heading'>Register New Bus</h3>

                <form onSubmit={handleAddBus} className='border'>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                          <label htmlFor="">Bus Number :</label><br />
                          <input
                            type="text"
                            placeholder="Bus number"
                            value={busnumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                            className='input'
                          />
                        </div>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Bus Name :</label><br />
                        <input
                            type="text"
                            placeholder="Bus Name"
                            value={busname}
                            onChange={(e) => setBusName(e.target.value)}
                            required
                            className='input'
                        /></div>
                    </div>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Bus Type :</label><br />
                        <input
                            type="text"
                            placeholder="Bus Type"
                            value={bustype}
                            onChange={(e) => setBusType(e.target.value)}
                            required
                            className='input'
                        />
                        </div>
                        <div className='inner-inputbox' >
                        <label htmlFor="">Total Seats :</label><br />
                        <input
                            type="text"
                            placeholder="Total Seats"
                            value={totalseats}
                            onChange={(e) => setTotalSeats(e.target.value)}
                            required
                            className='input'
                        />
                        </div>
                    </div>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Available Seats :</label><br />
                        <input
                            type="text"
                            placeholder="Available Seats"
                            value={availableseats}
                            onChange={(e) => setAvailableSeats(e.target.value)}
                            required
                          className='input'
                        />
                        </div>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Fare Price</label><br />
                        <input
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className='input'
                        />
                        </div>
                    </div>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Source :</label><br />
                        <input
                            type="text"
                            placeholder="Source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                            className='input'
                        />
                        </div>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Destination :</label><br />
                        <input
                            type="text"
                            placeholder="Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                            className='input'
                        />
                        </div>
                    </div>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                          <label htmlFor="">Journey Date :</label><br />
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='input'
                          />
                        </div>
                    </div>
                    <h3 className='add-bus-heading'>Add Stoppages</h3>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Name :</label><br />
                        <input
                            type="text"
                            placeholder="Stoppage Name"
                            value={stoppageName}
                            onChange={(e) => setStoppageName(e.target.value)}
                            className='input'
                        />
                        </div>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Price</label><br />
                        <input
                            type="number"
                            placeholder="Stoppage Price"
                            value={stoppagePrice}
                            onChange={(e) => setStoppagePrice(e.target.value)}
                            className='input'
                        />
                        </div>
                        <div className='inner-inputbox'>
                        <label htmlFor="">Arrival Time</label><br />
                        <input
                            type="text"
                            placeholder="Stoppages Arrival Time"
                            value={stoppageArivalTime}
                            onChange={(e) => setStoppageArivalTime(e.target.value)}
                            className='input'
                        />
                        </div>
                    </div>
                    
                    <div  >
                        {stops.map((stoppage, index) => (
                            <div key={index} className='bus-stoppages'> <img src={assets.stop} alt="" />{stoppage.name} - ₹{stoppage.price} - {stoppage.arivaltime}</div>
                        ))}
                    </div>
                    <button type="button" onClick={handleAddStoppage} className='add-stop-button'>Add Stoppage</button>
                    <div className='inputbox'>
                        <div className='inner-inputbox'>
                            <label htmlFor="">Departure Time</label><br />
                            <input type="text" placeholder="Departure Time" value={departuretime} onChange={(e) => setDepartureTime(e.target.value)} required className='input' />
                        </div>
                        <div className='inner-inputbox'>
                            <label htmlFor="">Arrival Time</label><br />
                            <input type="text" placeholder="Arrival Time" value={arivaltime} onChange={(e) => setArivaltime(e.target.value)} required className='input' />
                        </div>
                    </div>
                    <button type="submit" className='add-stop-button'>Add Bus</button>
                </form>
            </div>
        </div>
    );
}

export default Addbus;