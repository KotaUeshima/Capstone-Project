import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { BsMusicPlayerFill } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import { userState } from '../utils/atoms'
import URL from '../utils/url.js'
import Spotify from './Spotify'

function AddSong({ addSongToPage }) {
  const recoilState = useRecoilValue(userState)
  const [show, setShow] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState('')
  const [coords, setCoords] = useState({})

  function selectTrack(track) {
    setSelectedTrack(track)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => null
    )
  }, [])

  function submitSong() {
    const songObj = {
      title: selectedTrack.name,
      artist: selectedTrack.artists[0].name,
      user_id: recoilState.id,
      image_url: selectedTrack.album.images[0].url,
      lat: coords.lat,
      lng: coords.lng,
      spotify_url: `${selectedTrack.external_urls.spotify.substring(0, 25)}embed/${selectedTrack.external_urls.spotify.substring(
        25
      )}?utm_source=generator`,
    }
    fetch(`${URL}/songs`, {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songObj),
    })
      .then(res => res.json())
      .then(data => {
        addSongToPage(data, { lat: coords.lat, lng: coords.lng })
      })
    handleClose()
  }

  return (
    <>
      <Button variant='dark' style={{ backgroundColor: '#ff385c', borderColor: '#ff385c' }} onClick={handleShow}>
        <BsMusicPlayerFill />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: '#212529',
              fontSize: '2rem',
              fontWeight: '700',
              marginLeft: '30%',
            }}
          >
            Share Song
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spotify selectTrack={selectTrack} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='dark'
            style={{
              backgroundColor: '#ff385c',
              borderColor: '#ff385c',
              fontWeight: '600',
            }}
            onClick={submitSong}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddSong
