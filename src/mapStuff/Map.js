import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import Places from "./Places";
import Locate from "./Locate";

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

const center = { lat: 35.6762, lng: 139.6503 };

const generateRandomMarkers = () => {
  const markerList = [];
  for (let i = 0; i < 100; i++) {
    markerList.push({
      lat: getRandomInRange(-90, 90, 3),
      lng: getRandomInRange(-180, 180, 3),
    });
  }
  return markerList;

  function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }
};

function Map() {
  const randomMarkers = generateRandomMarkers();

  const [search, setSearch] = useState();
  const [selectedIcon, setSelectedIcon] = useState(null);

  // used to try to get markers to render on first time and re-renders, not sure if neccesary
  const [renderMarker, setRenderMarker] = useState(null);
  useEffect(() => {
    setRenderMarker(true);
  }, []);

  const mapRef = useRef(/** @type google.maps.GoogleMap */);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

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
        {/* {renderMarker && (
          <>
            <MarkerClusterer>
              {(clusterer) =>
                randomMarkers.map((marker) => (
                  <Marker
                    key={marker.lat * marker.lng}
                    position={marker}
                    clusterer={clusterer}
                    onClick={() => setSelectedIcon(marker)}
                  />
                ))
              }
            </MarkerClusterer>
          </>
        )} */}
        {renderMarker && (
          <InfoWindow position={center}>
            <div>
              <h1>Drake</h1>
              <p>Nonstop</p>
            </div>
          </InfoWindow>
        )}

        {search && (
          <Marker
            position={search}
            onClick={() => setSelectedIcon(search)}
            icon={{
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS206B28eXo3eaB5ONB2G9w_RLjPIU9m9ahsA&usqp=CAU",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        )}
        {selectedIcon && (
          <InfoWindow
            position={selectedIcon}
            onCloseClick={() => {
              setSelectedIcon(null);
            }}
          >
            <div>
              <h2>Drake</h2>
              <p>Nonstop</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default Map;
