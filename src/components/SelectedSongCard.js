import React from "react";
import { Card } from "react-bootstrap";
import SpotifyPlayer from "react-spotify-web-playback";

function SelectedSongCard({ selectedIcon }) {
  if (!selectedIcon) return;
  return (
    <>
      <Card
        style={{
          width: "10rem",
          zIndex: "10",
          position: "absolute",
          bottom: "3rem",
          left: "3rem",
        }}
      >
        <Card.Img variant="top" src={selectedIcon.image_url} />
        <Card.Body>
          <Card.Title>{selectedIcon.title}</Card.Title>
          <Card.Text>{selectedIcon.artist}</Card.Text>
        </Card.Body>
      </Card>
      {/* <SpotifyPlayer
        token="BQAI_7RWPJuqdZxS-I8XzhkUi9RKr8Q8UUNaJAHwWlpIq6..."
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      /> */}
      ;
    </>
  );
}

export default SelectedSongCard;
