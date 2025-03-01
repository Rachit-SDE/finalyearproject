import React, { useState } from 'react';
import axios from 'axios';
import { use } from 'react';

function Test() {

    const[name, setName] = useState('')
    const[age, setAge] = useState('')
    const [busId, setBusId] = useState('');
    const [passengers, setPassengers] = useState([{ name: '', age: '' }]);
    console.log(passengers)
    const handlePassengerChange = (event) => {
      setStops([...stops, { name: name, age: age, }]);
    };

    const addPassenger = (e) => {
        e.preventDefault();
        setPassengers([...passengers, { name: name, age: age }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/bookings', { busId, passengers });
            console.log('Booking successful:', response.data);
        } catch (error) {
            console.error('Error booking tickets:', error);
        }
    };

    return (
        <div className="container">
            <h1>Bus Ticket Booking</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bus ID:</label>
                    <input type="text" value={busId} onChange={(e) => setBusId(e.target.value)} required />
                </div>
                    <div>
                        <h3>Passenger {1}</h3>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                      {
                        passengers.map((passenger, index) => (
                          <div key={index}>
                            {passenger.name}
                            </div>
                        ))
                      }
                    </div>
                <button type="button" onClick={addPassenger}>Add Passenger</button>
                <button type="submit">Book Tickets</button>
            </form>
        </div>
    );
}

export default Test;