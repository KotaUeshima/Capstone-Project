import React from "react";
import { Button } from "react-bootstrap";
import { FaLocationArrow } from "react-icons/fa";

function Locate({ setSearch }) {
  return (
    <Button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setSearch({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <FaLocationArrow />
    </Button>
  );
}

export default Locate;
