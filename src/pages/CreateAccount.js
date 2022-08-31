import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
const URL = "http://localhost:3000";

function CreateAccount() {
  const [formObj, setFormObj] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormObj((obj) => ({ ...obj, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: formObj }),
    })
      .then((res) => res.json())
      .then(console.log);
    setFormObj({
      username: "",
      password: "",
    });
  }
  return (
    <Container>
      <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
        Create Account
      </h1>
      <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="username"
                value={formObj.username}
                onChange={handleChange}
                type="username"
                placeholder="Enter Username"
              />
            </Form.Group>

            <Form.Group className="mt-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                value={formObj.password}
                onChange={handleChange}
                type="text"
                placeholder="Password"
              />
            </Form.Group>

            <Button className="mt-3" variant="success btn-block" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <h6 className="mt-5 p-5 text-center text-secondary ">
        Copyright © 2022 Kota Ueshima. All Rights Reserved.
      </h6>
    </Container>
  );
}

export default CreateAccount;
