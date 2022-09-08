import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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

  const backgroundImage =
    "https://media.istockphoto.com/photos/network-connections-world-map-polygon-graphic-background-with-lines-picture-id1192803561?b=1&k=20&m=1192803561&s=612x612&w=0&h=bkx9X7Mz2-Mi_sWe_8_PeTOCluTJrm7umhqwyYYsHYw=";

  return (
    <div
      style={{
        minHeight: "94vh",
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        position: "absolute",
        top: "3.5rem",
      }}
    >
      <Container>
        <Row className="mt-5">
          <Col
            sm={8}
            style={{ zIndex: "10", backgroundColor: "#212529" }}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <h1
              style={{ color: "#ff385c", fontSize: "3rem", fontWeight: "600" }}
              className="mt-3 p-3 text-center rounded"
            >
              Create Account
            </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-4">
                <Form.Control
                  id="username"
                  value={formObj.username}
                  onChange={handleChange}
                  type="username"
                  placeholder="Enter Username"
                  className="p-3"
                  style={{
                    boxShadow: "none",
                    fontWeight: "600",
                  }}
                />
              </Form.Group>

              <Form.Group className="my-4">
                <Form.Control
                  id="password"
                  value={formObj.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="p-3"
                  style={{ boxShadow: "none", fontWeight: "600" }}
                />
              </Form.Group>

              <Button
                className="mt-3"
                type="submit"
                style={{
                  backgroundColor: "#ff385c",
                  borderColor: "#ff385c",
                  width: "100%",
                  fontWeight: "600",
                }}
              >
                Create Account
              </Button>
            </Form>
            <h6 className="mt-3 text-center text-secondary">
              Already have an account?
              <Link style={{ padding: "5px", color: "#ff385c" }} to="/login">
                Login
              </Link>
            </h6>
            <h6 className="p-5 text-center text-secondary ">
              Copyright © 2022 Kota Ueshima. All Rights Reserved.
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateAccount;
