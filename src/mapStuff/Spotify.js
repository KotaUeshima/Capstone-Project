import React, { useState, useEffect } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";

const CLIENT_ID = "40ff9b6a103d498382bd8bf9b1809896";
const CLIENT_SECRET = "8d09d4624e7244d19648bc1c729eb71e";

function Spotify() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var track = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.tracks.items);
      });
  }

  function handleSelect(track) {
    setSelectedTrack(track);
  }

  return (
    <>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for Song"
            type="input"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
              }
            }}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {tracks.map((track, i) => {
            return (
              <Card key={i} onClick={() => handleSelect(track)}>
                <Card.Img src={track.album.images[0].url} />
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                  <p>{track.artists[0].name}</p>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Spotify;
