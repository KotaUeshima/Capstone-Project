import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import URL from '../utils/url.js'

function CreateAccount() {
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
    if (!password || password === '') newErrors.password = ['Cannot be blank!']
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = findFormErrors()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: formObj }),
      }).then(res => {
        if (res.ok) {
          res.json().then(() => {
            setFormObj({
              username: '',
              password: '',
            })
            navigate('/login')
          })
        } else {
          res.json().then(data => {
            const validationObj = {}
            data.errors.map(error => {
              if (error === 'Username has already been taken') {
                validationObj.username = error
                return true
              } else if (!validationObj.password) {
                validationObj.password = [error]
                return true
              } else {
                validationObj.password = [...validationObj.password, error]
                return true
              }
            })
            setErrors(validationObj)
          })
        }
      })
    }
  }

  return (
    <Container>
      <Row className=''>
        <Col sm={6} style={{ zIndex: '10' }} className='p-5 m-auto rounded-lg'>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className='my-4'>
              <Form.Control
                id='username'
                value={formObj.username}
                onChange={handleChange}
                type='username'
                placeholder='Create Username'
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
                placeholder='Create Password'
                className='p-3'
                style={{ boxShadow: 'none', fontWeight: '600' }}
                isInvalid={!!errors.password}
              />
              {errors.password &&
                errors.password.map(error => {
                  return (
                    <Form.Control.Feedback style={{ color: '#ff385c' }} type='Invalid' key={error}>
                      {error}
                    </Form.Control.Feedback>
                  )
                })}
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
              Create Account
            </Button>
          </Form>
          <h6 className='mt-3 text-center text-secondary'>
            Already have an account?
            <Link style={{ padding: '5px', color: '#ff385c' }} to='/login'>
              Login
            </Link>
          </h6>
          <h6 className='p-5 text-center text-secondary '>Copyright © 2022 Kota Ueshima. All Rights Reserved.</h6>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateAccount
