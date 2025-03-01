import React from 'react';
import '../resources/SeatSelection.css'
import { assets } from '../assets/assets';

const SeatSelection = ({ selectedSeats, setSelectedSeats, bus }) => {
    // Ensure capacity is a valid number
    const capacity = bus.totalseats && bus.totalseats > 0 ? bus.totalseats - 2 : 0; // Default to 0 if invalid
    const seatsPerRow = 5; // Number of seats per row

    // Calculate the number of rows needed
    const numberOfRows = Math.ceil(capacity / seatsPerRow);

    const selectOrUnselectSeats = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) { // Use includes instead of include
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    return (
        <div className='seat-selection'>
            <div className='seats-container'>
                <div className='seats-container-upper'>
                    <div className='seats-container-upper-left'>
                        <div className='seat-container-upper-stair'><img src={assets.stairs} alt="" /></div>
                        <div className='seat-container-upper-condacter'><img src={assets.constantchair} alt="" /></div>
                    </div>
                    <div className='seats-container-upper-right'>
                        <div className='seats-container-upper-right-steering'><img src={assets.steering} alt="" /></div>
                        <div className='seats-container-upper-right-driver'><img src={assets.constantchair} alt="" /></div>
                    </div>
                </div>
                {/* Create rows */}
                <div className='seats-container-lower'>
                    {Array.from({ length: numberOfRows }, (_, rowIndex) => (
                        <div key={rowIndex} className='seat-row'><br />
                            {/* Create seats for each row */}
                            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                                const seatNumber = rowIndex * seatsPerRow + seatIndex; // Calculate the seat number
                                if (seatNumber < capacity) { // Ensure we don't exceed the total capacity
                                    let seatClass = '';
                                    if (selectedSeats.includes(seatNumber + 1)) { // Use includes instead of include
                                        seatClass = 'selected-seat';
                                    }else if (bus.seatsBooked.includes(seatNumber + 1))
                                        {
                                            seatClass = 'booked-seat'
                                        } 
                                    return (
                                        <div key={seatNumber} className='seat-column'> {/* Adjust span to fit 5 columns */}
                                            
                                            <div className={`seat ${seatClass}`} onClick={() => selectOrUnselectSeats(seatNumber + 1)}>
                                                <p className='seat-number'>{seatNumber + 1}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null; // Return null for any extra seats beyond capacity
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;