import React, { useState, useEffect } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const CLIENT_ID = "40ff9b6a103d498382bd8bf9b1809896";
const CLIENT_SECRET = "8d09d4624e7244d19648bc1c729eb71e";

function Spotify({ selectTrack }) {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedSongForColor, setSelectedSongForColor] = useState(null);

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

    var trackGetter = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput +
        "&type=track&limit=20",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.tracks.items);
      });
  }

  return (
    <>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search Song/Artist"
            type="input"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
          <Button onClick={search}>
            <FaSearch />
          </Button>
        </InputGroup>
      </Container>
      <Container style={{ overflow: "auto", height: "50vh" }}>
        <ListGroup>
          {tracks.map((track, i) => {
            return (
              <ListGroup.Item
                as="li"
                style={{
                  backgroundColor:
                    track == selectedSongForColor ? "#EFEFEF" : "white",
                }}
                className="d-flex justify-content-between align-items-start"
                onClick={(e) => {
                  let listItem = e.target;
                  while (listItem.nodeName != "LI") {
                    listItem = listItem.parentNode;
                  }
                  listItem.style.backgroundColor = "#EFEFEF";
                  setSelectedSongForColor(track);
                  selectTrack(track);
                }}
                key={track.external_urls}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{track.name}</div>
                  {track.artists[0].name}
                </div>
                <img height="20%" width="20%" src={track.album.images[0].url} />
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    </>
  );
}

export default Spotify;
