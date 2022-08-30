import React from "react";
import Map from "./Map";
import { useLoadScript } from "@react-google-maps/api";

function MapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading is in progess...</div>;
  }

  return <Map />;
}

export default MapContainer;
