import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import axios from 'axios';

// Home Component
const Demo = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Function to get and update location
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });

          // Send the location to the backend (Optional)
          try {
            await axios.post('http://localhost:5000/update-location', {
              latitude,
              longitude,
            });
          } catch (err) {
            console.error("Error sending location:", err);
          }
        },
        (err) => {
          setError(err.message || "Failed to get location");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    // Update location every 10 seconds
    const interval = setInterval(updateLocation, 10000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Component to update map view based on the location
  const MapViewUpdater = () => {
    const map = useMap(); // Correctly using useMap within MapContainer context

    useEffect(() => {
      if (location) {
        map.setView([location.latitude, location.longitude], 13);
      }
    }, [location, map]);

    return null; // This component doesn't render anything itself
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]} // Initial fallback center
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        {/* HERE Tile Layer */}
        <TileLayer
          url="https://{s}.{base}.maps.api.here.com/maptile/2.1/maptile/newest/{type}/{z}/{x}/{y}/256/png?lg=eng&apiKey=YOUR_HERE_API_KEY"
          attribution='&copy; <a href="https://www.here.com/">HERE</a> contributors'
          subdomains="1234"
          base="base"
          type="terrain" // You can change the map type to "satellite", "terrain", or "normal.day"
        />
        <MapViewUpdater /> {/* Add this component to update map position */}
        {location && (
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Demo;