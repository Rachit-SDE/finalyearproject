import { useState, useEffect } from 'react';

const Map = () => {
  // Initializing with some sample buses with random coordinates
  const initialBuses = [
    { id: 1, latitude: 40.7128, longitude: -74.0060 }, // New York (example)
    { id: 2, latitude: 34.0522, longitude: -118.2437 }, // Los Angeles (example)
    { id: 3, latitude: 51.5074, longitude: -0.1278 }, // London (example)
  ];

  const [buses, setBuses] = useState(initialBuses);

  useEffect(() => {
    // Function to simulate movement of buses
    const updateBusPositions = () => {
      setBuses(prevBuses => {
        return prevBuses.map(bus => {
          // Simulate bus movement (randomly changing position slightly)
          return {
            ...bus,
            latitude: bus.latitude + (Math.random() - 0.5) * 0.01,  // Small change in latitude
            longitude: bus.longitude + (Math.random() - 0.5) * 0.01, // Small change in longitude
          };
        });
      });
    };

    // Update bus positions every 15 seconds
    const intervalId = setInterval(() => {
      updateBusPositions();  // Pass updated buses data to the parent component
    }, 15000); // 15 seconds

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  console.log(initialBuses);

  return (
    <div>
      <h3>Bus Simulation Running...</h3>
      {/* Render something here if you want */}
    </div>
  );
};

export default Map;
