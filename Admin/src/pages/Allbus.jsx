import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../resources/Allbus.css';
import { message } from 'antd'
import { assets } from '../assets/assets'

const Allbus = () => {
    const [busnumber, setBusNumber] = useState('');
    const [busname, setBusName] = useState('');
    const [bustype, setBusType] = useState('');
    const [totalseats, setTotalSeats] = useState('');
    const [availableseats, setAvailableSeats] = useState(0);
    const [price, setPrice] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [arivaltime, setArivalTime] = useState('');
    const [departuretime, setDepartureTime] = useState('');
    const [editPopup, setEditPopup] = useState(false);
    const [stoppages, setStoppages] = useState([]);
    const [buses, setBuses] = useState([]);
    const [busId, setBusId] = useState('');
    console.log(arivaltime)

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/bus/allbuses');
            setBuses(response.data.busData);
        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    };

    const handleStoppageChange = (index, field, value) => {
        const updatedStoppages = [...stoppages];
        updatedStoppages[index][field] = value;
        setStoppages(updatedStoppages);
    };

    

    const updateBus = async () => {
        const updatedBus = { busnumber, busname, bustype, totalseats, availableseats, price, source, destination, arivaltime, departuretime, stoppages };
        await axios.put(`http://localhost:4000/api/bus/updatebus/${busId}`, updatedBus);
        fetchBuses();
        message.success("Bus Updated Successfully")
        
    };

    const deleteBus = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/bus/removebus/${id}`);
            fetchBuses();
            message.success("Bus Removed Successfully")
            
        } catch (error) {
            console.error('Error deleting bus:', error);
        }
    };

    const clearFields = () => {
        setBusName('');
        setBusType('');
        setTotalSeats(0);
        setAvailableSeats(0);
        setTicketPrice(0);
        setBusId('');
        setStoppages([]); // Clear stoppages as well
    };

    return (
        <>
            <div className='bus-list'>
                <h1 className='bus-list-heading' >All Buses</h1>
                  <div className='all-buses-name'>
                    {buses.map(bus => (
                        <li key={bus._id} className='individual-busname'>
                          <div className='individual-busname-top'>
                            <div> {bus.busname}</div>
                            <div>{bus.busnumber}</div>
                            <div>{bus.bustype}</div>
                          </div>
                          <div className='bus-source'>
                            <img src={assets.bussource}  alt="" /> &nbsp;{bus.source} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bus.departuretime}
                          </div>
                            <div>
                                {Array.isArray(bus.stops) && bus.stops.length > 0 ? (
                                    bus.stops.map((stoppage, index) => (
                                      // eslint-disable-next-line react/jsx-key
                                      <div className='main-bus-stop'>
                                        <div key = {index} className='bus-Stop'> <img src={assets.stop}  alt="" />{stoppage.name} &nbsp; - &nbsp; ₹{stoppage.price} &nbsp; - &nbsp; {stoppage.arivaltime}</div>
                                        <div className='dot'></div>
                                      </div>
                                    ))
                                ) : (
                                    <li>No stoppages available.</li>
                                )}
                            </div>
                            <div className='bus-source'>
                            <img src={assets.busdestination} alt="" />{bus.destination}&nbsp;&nbsp;&nbsp;&nbsp;{bus.arivaltime}
                          
                            </div>
                            <div className='bus-price'>
                              <img src={assets.rupee} alt="" />{bus.price}
                            </div>
                            
                            <br />
                            <button onClick={() => {
                                setEditPopup(true);
                                setBusId(bus._id);
                                setBusNumber(bus.busnumber);
                                setBusName(bus.busname);
                                setBusType(bus.bustype);
                                setTotalSeats(bus.totalseats);
                                setAvailableSeats(bus.availableseats);
                                setPrice(bus.price);
                                setArivalTime(bus.arivaltime);
                                setDepartureTime(bus.departuretime);
                                setSource(bus.source);
                                setDestination(bus.destination);
                                setStoppages(bus.stops || []); // Ensure stoppages is an array
                                
                            }} className ="bus-edit-button">Edit</button>
                            <button onClick ={()=> {setEditPopup(true)}}></button>

                            <button onClick={() => deleteBus(bus._id)} className ="delet-edit-button">Delete</button>
                        </li>
                    ))}
                  </div>
                <div>{editPopup? 
                <div className='EditPopup'>
                    <h1 className='editbusheading'><b>Edit Bus Details</b></h1>
                    <div className='edit-inpu-box'>
                      <div className='inner-input-box'>
                        <label>Bus Number:</label><br/>
                        <input type="text" placeholder ={busnumber} value={busnumber} onChange={(e) => setBusNumber(e.target.value)} className='main-input'/>
                      </div>
                      <div className='inner-input-box'>
                        <label>Bus Name:</label><br/>
                        <input type="text" placeholder ={busname} value={busname} onChange={(e) => setBusName(e.target.value)} className='main-input' />
                      </div>
                    </div>

                    <div className='edit-inpu-box'>
                      <div className='inner-input-box'>
                        <label>Source:</label><br/>
                        <input type="text" placeholder ={source} value={source} onChange={(e) => setSource(e.target.value)} className='main-input'/>
                      </div>
                      <div className='inner-input-box'>
                        <label>Destination:</label><br/>
                        <input type="text" placeholder ={destination} value={destination} onChange={(e) => setDestination(e.target.value)} className='main-input'/>
                      </div>
                    </div>
                    <div className='edit-inpu-box'>
                      <div className='inner-input-box'>
                        <label>Total Seats:</label><br/>
                        <input type="text" placeholder ={totalseats} value={totalseats} onChange={(e) => setTotalSeats(e.target.value)} className='main-input'/>
                      </div>
                      <div className='inner-input-box'>
                        <label>Available Seats:</label><br/>
                        <input type="text" placeholder ={availableseats} value={availableseats} onChange={(e) => setAvailableSeats(e.target.value)} className='main-input'/>
                      </div>
                    </div>
                    <p className='bus-stoppages'>Bus Stoppages</p>
                    {stoppages.map((stoppage, index) => (
                                        <div className='stoppage-input-box'>
                                            <div className='inner-stoppage-input-box'>
                                             <label>Name:</label>
                                             <input key={index} placeholder ={stoppage.name} onChange={(e) => handleStoppageChange(index, 'name', e.target.value)}  className='stoppage-main-input' />
                                            </div>
                                            <div className='inner-stoppage-input-box'>
                                             <label>Price:</label>
                                             <input key={index} placeholder ={stoppage.price} onChange={(e) => handleStoppageChange(index, 'price', e.target.value)} className='stoppage-main-input' />
                                            </div>
                                            <div className='inner-stoppage-input-box'>
                                             <label>Arival Time</label>
                                             <input key={index} placeholder ={stoppage.arivaltime} onChange={(e) => handleStoppageChange(index, 'arivaltime', e.target.value)} className='stoppage-main-input' />
                                            </div>
                                        </div>
                                        
                    ))}
                    <div className='edit-inpu-box'>
                      <div className='inner-input-box'>
                        <label>Arival Time</label><br/>
                        <input type="text" placeholder ={arivaltime} value={arivaltime} onChange={(e) => setArivalTime(e.target.value)} className='main-input'/>
                      </div>
                      <div className='inner-input-box'>
                        <label>Departure Time</label><br/>
                        <input type="text" placeholder ={departuretime} value={departuretime} onChange={(e) => setDepartureTime(e.target.value)} className='main-input'/>
                      </div>
                    </div>
                    <div className='edit-inpu-box'>
                      <div className='inner-input-box'>
                        <label>Ticket Price</label><br/>
                        <input type="text" placeholder ={price} value={price} onChange={(e) => setPrice(e.target.value)} className='main-input'/>
                      </div>
                      <div className='inner-input-box'>
                        <label>Bus Type</label><br/>
                        <input type="text" placeholder ={bustype} value={bustype} onChange={(e) => setBusType(e.target.value)} className='main-input'/>
                      </div>
                    </div>
                    <div className='button-box'>
                      
                      <button onClick={()=> updateBus()} className='E-button'>Update Bus</button>
                      <button onClick ={() => setEditPopup(false)} className='delet-edit-button'>Cancle</button>
                    </div>

                </div>:<></>}</div>
            </div>
        </>
    );
};

export default Allbus;