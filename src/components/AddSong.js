import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spotify from "../mapStuff/Spotify";
import { useRecoilValue } from "recoil";
import { userState } from "../components/atoms";
const URL = "http://localhost:3000";

const buttonStyle = {
  position: "absolute",
  top: "8rem",
  left: "1rem",
  zIndex: "10",
};

function AddSong() {
  const recoilState = useRecoilValue(userState);
  const [show, setShow] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [coords, setCoords] = useState({});

  function selectTrack(track) {
    setSelectedTrack(track);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude - 1,
          lng: position.coords.longitude - 1,
        });
      },
      () => null
    );
  }, []);

  function submitSong() {
    const songObj = {
      title: selectedTrack.name,
      artist: selectedTrack.artists[0].name,
      user_id: recoilState.id,
      image_url: selectedTrack.album.images[0].url,
      lat: coords.lat,
      lng: coords.lng,
      spotify_url: `${selectedTrack.external_urls.spotify.substring(
        0,
        25
      )}embed/${selectedTrack.external_urls.spotify.substring(
        25
      )}?utm_source=generator`,
    };
    fetch(`${URL}/songs`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songObj),
    })
      .then((res) => res.json())
      .then(console.log);
    handleClose();
  }

  return (
    <>
      <Button variant="primary" style={buttonStyle} onClick={handleShow}>
        Add Song
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spotify selectTrack={selectTrack} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitSong}>
            Add Song to Map
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSong;
