import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaLocationArrow } from "react-icons/fa";

function Locate({ setSearch }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant="dark"
      style={{ backgroundColor: "#ff385c", borderColor: "#ff385c" }}
      onClick={() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setSearch({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLoading(false);
          },
          () => null
        );
      }}
    >
      <>
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <FaLocationArrow />
        )}
      </>
    </Button>
  );
}

export default Locate;
