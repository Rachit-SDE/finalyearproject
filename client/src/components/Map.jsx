// src/components/Map.js
import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    // Make sure the HERE Maps script is loaded before using it
    if (window.H) {
      const platform = new window.H.service.Platform({
        apikey: "YOUR_HERE_API_KEY", // Replace with your API Key
      });

      const mapContainer = document.getElementById("mapContainer");
      const defaultLayers = platform.createDefaultLayers();
      const map = new window.H.Map(
        mapContainer,
        defaultLayers.vector.normal.map,
        {
          center: { lat: 52.5159, lng: 13.3777 }, // Coordinates for Berlin, for example
          zoom: 10,
        }
      );

      // Enable the map's UI components
      new window.H.ui.UI.createDefault(map, defaultLayers);

      // Resize the map when the window is resized
      window.addEventListener("resize", () => map.getViewPort().resize());
    }
  }, []);

  return (
    <div
      id="mapContainer"
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
};

export default Map;
