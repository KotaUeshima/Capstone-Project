import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spotify from "./Spotify";
import { BsMusicPlayerFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { userState } from "../components/atoms";
const URL = "http://localhost:3000";

function AddSong({ addSongToPage }) {
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
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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
      .then((data) => {
        addSongToPage(data);
      });
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <BsMusicPlayerFill />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Song To Current Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spotify selectTrack={selectTrack} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitSong}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSong;
