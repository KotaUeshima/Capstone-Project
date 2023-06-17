import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import NewUpdates from '../components/NewUpdates.js'
import { userState } from '../utils/atoms'
import URL from '../utils/url.js'

function Login() {
  const setUserState = useSetRecoilState(userState)
  const [formObj, setFormObj] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  let navigate = useNavigate()

  function handleChange(e) {
    setFormObj(obj => ({ ...obj, [e.target.id]: e.target.value }))
    if (!!errors[e.target.id])
      setErrors({
        ...errors,
        [e.target.id]: null,
      })
  }

  const findFormErrors = () => {
    const { username, password } = formObj
    const newErrors = {}
    if (!username || username === '') newErrors.username = 'Cannot be blank!'
    if (!password || password === '') newErrors.password = 'Cannot be blank!'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = findFormErrors()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: formObj }),
      }).then(res => {
        if (res.ok) {
          res.json().then(data => {
            setUserState({
              username: data.user.username,
              id: data.user.id,
            })
            setFormObj({
              username: '',
              password: '',
            })
            localStorage.setItem('token', data.jwt)
            navigate('/map')
          })
        } else {
          res.json().then(data => {
            if (data.error === 'Invalid password') {
              setErrors({
                password: data.error,
              })
            } else {
              setErrors({ username: data.error })
            }
          })
        }
      })
    }
  }

  const backgroundImage = 'https://img.freepik.com/free-vector/realistic-white-golden-geometric-background_79603-2032.jpg?w=2000'

  return (
    <div
      style={{
        minHeight: '90vh',
        width: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        position: 'absolute',
        top: '5rem',
      }}
    >
      <Container>
        <Row className='mt-5'>
          <Col sm={6} style={{ zIndex: '10', backgroundColor: '#212529' }}>
            <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: '700' }} className='mt-5 text-center'>
              What's In Store Next?
            </h1>
            <p className='mb-4 text-center text-white'>Here is what our developers are working on for the next update!</p>
            <div
              style={{
                width: '30vw',
                margin: 'auto',
                border: '0.10rem solid #ff385c',
              }}
            >
              <NewUpdates />
            </div>
          </Col>
          <Col sm={1}>
            <></>
          </Col>
          <Col sm={5} style={{ zIndex: '10', backgroundColor: '#212529' }} className='p-5 m-auto shadow-sm rounded-lg'>
            <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: '700' }} className='mt-2 p-3 text-center rounded'>
              Login
            </h1>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className='my-4'>
                <Form.Control
                  id='username'
                  value={formObj.username}
                  onChange={handleChange}
                  type='username'
                  placeholder='Enter Username'
                  className='p-3'
                  style={{
                    boxShadow: 'none',
                    fontWeight: '600',
                  }}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback style={{ color: '#ff385c' }} type='Invalid'>
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='my-4'>
                <Form.Control
                  id='password'
                  value={formObj.password}
                  onChange={handleChange}
                  type='password'
                  placeholder='Password'
                  className='p-3'
                  style={{ boxShadow: 'none', fontWeight: '600' }}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback style={{ color: '#ff385c' }} type='Invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant='dark'
                className='mt-3'
                type='submit'
                style={{
                  backgroundColor: '#ff385c',
                  borderColor: '#ff385c',
                  width: '100%',
                  fontWeight: '600',
                }}
              >
                Login
              </Button>
            </Form>
            <h6 className='mt-3 text-center text-secondary'>
              Don't have an account?
              <Link style={{ padding: '5px', color: '#ff385c' }} to='/' state={{ from: 'moveDown' }}>
                Create Account
              </Link>
            </h6>
            <h6 className='p-5 text-center text-secondary '>Copyright © 2022 Kota Ueshima. All Rights Reserved.</h6>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
