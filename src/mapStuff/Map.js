import { GoogleMap, InfoWindow } from '@react-google-maps/api'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Card, Spinner } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { BsMusicPlayerFill } from 'react-icons/bs'
import { ImShuffle } from 'react-icons/im'
import Sidebar from '../components/Sidebar.js'
import AddSong from './AddSong'
import Locate from './Locate'
import Places from './Places'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { showSidebar, userState } from '../utils/atoms'

import { GoogleMapsOverlay } from '@deck.gl/google-maps'
import { ScatterplotLayer } from 'deck.gl'
// import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// import { HexagonLayer } from "@deck.gl/aggregation-layers";

import URL from '../utils/url.js'

const containerStyle = {
  width: '100vw',
  height: '90vh',
}

const buttonStyle = {
  position: 'absolute',
  top: '6rem',
  left: '1rem',
  zIndex: '10',
}

const spotifyPlayStyle = {
  zIndex: '10',
  position: 'absolute',
  left: '1rem',
  bottom: '1rem',
}

const center = { lat: 39.8283, lng: -98.5795 }

function Map() {
  const recoilState = useRecoilValue(userState)
  const [search, setSearch] = useState()
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [songs, setSongs] = useState([])
  const setShow = useSetRecoilState(showSidebar)

  useEffect(() => {
    fetch(`${URL}/songs`)
      .then(res => res.json())
      .then(setSongs)
    setShow(false)
  }, [setShow])

  if (search === 'wzoom') console.log('for eslint purposes')

  const mapRef = useRef(/** @type google.maps.GoogleMap */)
  const onLoad = useCallback(map => (mapRef.current = map), [])

  function addSongToPage(data, location) {
    setSongs(songs => [...songs, data])
    setSelectedIcon(data)
    mapRef.current?.panTo(location)
    mapRef.current?.setZoom(14)
  }

  function goToSelectedSong(song) {
    mapRef.current?.panTo({ lat: song.lat, lng: song.lng })
    mapRef.current?.setZoom(14)
    setSelectedIcon(song)
  }

  function waitForElement() {
    if (typeof mapRef.current !== 'undefined') {
      constructOverlay()
    } else {
      setTimeout(waitForElement, 250)
    }
  }
  waitForElement()

  function constructOverlay() {
    const scatter = () =>
      new ScatterplotLayer({
        id: 'scatter',
        data: songs,
        getPosition: d => [d.lng, d.lat],
        getFillColor: () => [255, 56, 92],
        getLineColor: () => [255, 56, 92],
        pickable: true,
        opacity: 0.8,
        stroked: true,
        filled: true,
        radiusUnit: 'common',
        radiusScale: 400,
        radiusMinPixels: 1,
        radiusMaxPixels: 15,
        onClick: ({ object }) => {
          setSelectedIcon(object)
        },
      })
    // const hexagon = () =>
    //   new HexagonLayer({
    //     id: "hex",
    //     data: songs,
    //     getPosition: (d) => [d.lng, d.lat],
    //     getElevationWeight: (d) => d.lat,
    //     elevationScale: 100,
    //   });
    // const heatmap = () =>
    //   new HeatmapLayer({
    //     id: "heatmap",
    //     data: songs,
    //     getPosition: (d) => [d.lng, d.lat],
    //     radiusPixels: 60,
    //   });
    const overlay = new GoogleMapsOverlay({
      layers: [scatter()],
    })
    overlay.setMap(mapRef.current)
  }

  return (
    <>
      {songs.length > -1 ? (
        <>
          <ButtonGroup style={buttonStyle}>
            <Button
              variant='dark'
              onClick={() => {
                mapRef.current?.panTo(center)
                mapRef.current?.setZoom(5)
                setSelectedIcon(null)
              }}
              style={{
                backgroundColor: '#ff385c',
                borderColor: '#ff385c',
              }}
            >
              <AiFillHome />
            </Button>
            <Locate
              setSearch={position => {
                setSearch(position)
                mapRef.current?.panTo(position)
                mapRef.current?.setZoom(14)
                setSelectedIcon(null)
              }}
            />
            <Button
              variant='dark'
              onClick={() => {
                if (songs.length > 0) {
                  let randomSong =
                    songs[Math.floor(Math.random() * songs.length)]
                  setSelectedIcon(randomSong)
                  mapRef.current?.panTo({
                    lat: randomSong.lat,
                    lng: randomSong.lng,
                  })
                  mapRef.current?.setZoom(14)
                }
              }}
              style={{
                backgroundColor: '#ff385c',
                borderColor: '#ff385c',
              }}
            >
              <ImShuffle />
            </Button>
            {!recoilState.username ? (
              <AddSong addSongToPage={addSongToPage} />
            ) : (
              <Button
                variant='dark'
                style={{
                  backgroundColor: '#ff385c',
                  borderColor: '#ff385c',
                }}
                onClick={() => {}}
                disabled
              >
                <BsMusicPlayerFill />
              </Button>
            )}
          </ButtonGroup>
          <Places
            setSearch={position => {
              setSearch(position)
              mapRef.current?.panTo(position)
              mapRef.current?.setZoom(14)
              setSelectedIcon(null)
            }}
          />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            options={{
              mapId: '2f1759f08238137f',
              disableDefaultUI: true,
              clickableIcons: false,
              minZoom: 3,
              maxZoom: 18,
            }}
            onLoad={onLoad}
            onClick={() => setSelectedIcon(null)}
          >
            {selectedIcon && (
              <InfoWindow
                position={{ lat: selectedIcon.lat, lng: selectedIcon.lng }}
                onCloseClick={() => {
                  setSelectedIcon(null)
                }}
              >
                <Card style={{ backgroundColor: 'grey', color: 'white' }}>
                  <Card.Body>
                    <Card.Text>
                      {selectedIcon.title} - {selectedIcon.artist}
                    </Card.Text>
                    <Card.Text>
                      User: {selectedIcon.user.username}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </InfoWindow>
            )}
          </GoogleMap>
          {selectedIcon && (
            <iframe
              style={spotifyPlayStyle}
              src={selectedIcon.spotify_url}
              width='30%'
              height='20%'
              title='spotifymusic'
              frameBorder='2'
              allowfullscreen='true'
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            ></iframe>
          )}
          <Sidebar goToSelectedSong={goToSelectedSong} />
        </>
      ) : (
        <div
          style={{
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3
            style={{
              color: 'gray',
              fontWeight: '700',
              fontSize: '1.5rem',
              marginTop: '5.5px',
            }}
          >
            Initializing Data &nbsp;
          </h3>
          <Spinner animation='grow' size='sm' />
          <h1>&nbsp;</h1>
          <Spinner animation='grow' size='sm' />
          <h1>&nbsp;</h1>
          <Spinner animation='grow' size='sm' />
        </div>
      )}
    </>
  )
}

export default Map

/* {renderMarker && (
          <>
            <MarkerClusterer>
              {(clusterer) =>
                songs.map((song) => (
                  <Marker
                    key={
                      song.lat * song.lng * (Math.random(5) + 1) +
                      Math.random(100)
                    }
                    position={{ lat: song.lat, lng: song.lng }}
                    clusterer={clusterer}
                    onClick={() => {
                      mapRef.current?.panTo({ lat: song.lat, lng: song.lng });
                      setSelectedIcon(song);
                    }}
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
        )} */
