import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import Places from "./Places";
import Locate from "./Locate";
import AddSong from "./AddSong";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import SelectedSongCard from "../components/SelectedSongCard";
import { useRecoilValue } from "recoil";
import { userState } from "../components/atoms";

import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { Scatterplot } from "@deck.gl/layers";
import { ScatterplotLayer } from "deck.gl";

const URL = "http://localhost:3000";

const containerStyle = {
  width: "100vw",
  height: "93vh",
};

const buttonStyle = {
  position: "absolute",
  top: "4rem",
  left: "1rem",
  zIndex: "10",
};

const spotifyPlayStyle = {
  zIndex: "10",
  position: "absolute",
  bottom: "0rem",
};

const center = { lat: 39.8283, lng: -98.5795 };

function Map() {
  const recoilState = useRecoilValue(userState);
  const [search, setSearch] = useState();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [songs, setSongs] = useState([]);

  // used to try to get markers to render on first time and re-renders, not sure if neccesary
  const [renderMarker, setRenderMarker] = useState(null);

  useEffect(() => {
    fetch(`${URL}/songs`)
      .then((res) => res.json())
      .then(setSongs);
    setRenderMarker(true);
  }, []);

  const mapRef = useRef(/** @type google.maps.GoogleMap */);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  // const scatter = () =>
  //   new ScatterplotLayer({
  //     id: "scatter",
  //     data: songs,
  //     getPosition: (d) => [d.lng, d.lat],
  //     pickable: true,
  //     opacity: 0.8,
  //     stroked: true,
  //     filled: true,
  //     radiusScale: 6,
  //     radiusMinPixels: 1,
  //     radiusMaxPixels: 100,
  //     lineWidthMinPixels: 1,

  //     onHover: ({ object, x, y }) => {},
  //     // onClick
  //   });

  // const overlay = new GoogleMapsOverlay({
  //   layers: [scatter()],
  // });

  // overlay.setMap(mapRef.current);

  // overlay.setProps (subsequent updates to the map)

  return (
    <>
      <ButtonGroup style={buttonStyle}>
        <Button
          onClick={() => {
            mapRef.current?.panTo(center);
            mapRef.current?.setZoom(5);
          }}
        >
          <AiFillHome />
        </Button>
        <Locate
          setSearch={(position) => {
            setSearch(position);
            mapRef.current?.panTo(position);
            mapRef.current?.setZoom(14);
          }}
        />
        {recoilState.username ? <AddSong /> : null}
      </ButtonGroup>
      <Places
        setSearch={(position) => {
          setSearch(position);
          mapRef.current?.panTo(position);
          mapRef.current?.setZoom(10);
        }}
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
        onLoad={onLoad}
      >
        {renderMarker && (
          <>
            <MarkerClusterer>
              {(clusterer) =>
                songs.map((song) => (
                  <Marker
                    key={
                      song.lat * song.lng * (Math.random() + 1) +
                      Math.random(10)
                    }
                    position={{ lat: song.lat, lng: song.lng }}
                    clusterer={clusterer}
                    onClick={() => setSelectedIcon(song)}
                    icon={{
                      url: "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/music-512.png",
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                  />
                ))
              }
            </MarkerClusterer>
          </>
        )}
        {selectedIcon && (
          <InfoWindow
            position={{ lat: selectedIcon.lat, lng: selectedIcon.lng }}
            onCloseClick={() => {
              setSelectedIcon(null);
            }}
          >
            <Card style={{ width: "10rem" }}>
              <Card.Img variant="top" src={selectedIcon.image_url} />
              <Card.Body>
                <Card.Title>{selectedIcon.title}</Card.Title>
                <Card.Text>{selectedIcon.artist}</Card.Text>
              </Card.Body>
            </Card>
          </InfoWindow>
        )}
        <SelectedSongCard selectedIcon={selectedIcon} />
      </GoogleMap>
      {selectedIcon && (
        <iframe
          style={spotifyPlayStyle}
          src={selectedIcon.spotify_url}
          width="100%"
          height="20%"
          frameBorder="2"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      )}
    </>
  );
}

export default Map;
