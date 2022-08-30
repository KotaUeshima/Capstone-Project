import React from "react";

const buttonStyle = {
  position: "absolute",
  top: "4rem",
  right: "1rem",
  background: "none",
  border: "none",
  zIndex: "10",
};

const imageStyle = {
  width: "60px",
  cursor: "pointer",
};

function Locate({ setSearch }) {
  return (
    <button
      style={buttonStyle}
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
      <img
        src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
        alt="compass"
        style={imageStyle}
      />
    </button>
  );
}

export default Locate;
