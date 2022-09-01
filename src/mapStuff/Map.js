import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import Places from "./Places";
import Locate from "./Locate";
const URL = "http://localhost:3000";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const buttonStyle = {
  position: "absolute",
  top: "4rem",
  left: "1rem",
  zIndex: "10",
};

const center = { lat: 39.8283, lng: -98.5795 };

function Map() {
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

  console.log(selectedIcon);

  return (
    <>
      <button style={buttonStyle} onClick={() => mapRef.current?.panTo(center)}>
        Return Home
      </button>
      <Places
        setSearch={(position) => {
          setSearch(position);
          mapRef.current?.panTo(position);
          mapRef.current?.setZoom(14);
        }}
      />
      <Locate
        setSearch={(position) => {
          setSearch(position);
          mapRef.current?.panTo(position);
          mapRef.current?.setZoom(14);
        }}
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          zoomControl: true,
        }}
        onLoad={onLoad}
      >
        {renderMarker && (
          <>
            <MarkerClusterer>
              {(clusterer) =>
                songs.map((song) => (
                  <Marker
                    key={song.lat * song.lng}
                    position={{ lat: song.lat, lng: song.lng }}
                    clusterer={clusterer}
                    onClick={() => setSelectedIcon(song)}
                    icon={{
                      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS206B28eXo3eaB5ONB2G9w_RLjPIU9m9ahsA&usqp=CAU",
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
            <div>
              <h2>{selectedIcon.title}</h2>
              <p>{selectedIcon.artist}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default Map;
