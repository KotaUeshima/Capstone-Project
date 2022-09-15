import React from "react";
import Carousel from "react-bootstrap/Carousel";

function NewUpdates() {
  const carouselArray = [
    {
      src: "https://cdn.sisense.com/wp-content/uploads/QbeeQ-DeckGL-2.png",
    },
    {
      src: "https://raw.github.com/visgl/deck.gl-data/master/images/whats-new/google-maps.jpg",
    },
    {
      src: "https://repository-images.githubusercontent.com/190149487/f6644d00-8668-11e9-9acb-8327a690bb56",
    },
    {
      src: "https://1mnyjc2jzb31384kw5ipe5s1-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/1millonusersb.jpg",
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
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default NewUpdates;
