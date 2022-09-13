import React from "react";
import Carousel from "react-bootstrap/Carousel";

function NewUpdates() {
  const carouselArray = [
    {
      src: "https://thumbs.dreamstime.com/b/golden-globe-isolated-black-background-digital-data-orbits-world-network-technology-communication-binary-bitstream-speeding-150375536.jpg",
      subtitle: "Working on introducing a spinning globe on homepage",
    },
    {
      src: "https://ak.picdn.net/shutterstock/videos/1024594901/thumb/11.jpg?ip=x480",
      subtitle:
        "Introducing a global counter to keep track of total users on platform",
    },
    {
      src: "data:image/png;base64,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",
      subtitle: "Random Shuffle Button To Explore Random Songs",
    },
  ];

  return (
    <Carousel fade>
      {carouselArray.map((item) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.header}
              style={{ objectFit: "cover" }}
              height="375vh"
            />
            <Carousel.Caption>
              <p style={{ color: "white" }}>{item.subtitle}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default NewUpdates;
