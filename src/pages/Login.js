import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { userState } from "../components/atoms";
import { useNavigate, Link } from "react-router-dom";
const URL = "http://localhost:3000";

function Login() {
  const setUserState = useSetRecoilState(userState);
  const [formObj, setFormObj] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  function handleChange(e) {
    setFormObj((obj) => ({ ...obj, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: formObj }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUserState({
            username: data.user.username,
            id: data.user.id,
          });
          setFormObj({
            username: "",
            password: "",
          });
          localStorage.setItem("token", data.jwt);
          navigate("/map");
        });
      } else {
      }
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
          <Col sm={7} className="p-5 m-auto shadow-sm rounded-lg">
            <div></div>
          </Col>
          <Col
            sm={5}
            style={{ zIndex: "10", backgroundColor: "#212529" }}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <h1
              style={{ color: "#ff385c", fontSize: "3rem", fontWeight: "600" }}
              className="mt-3 p-3 text-center rounded"
            >
              Login
            </h1>
            <Form noValidate onSubmit={handleSubmit}>
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
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="Invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="my-4">
                <Form.Control
                  id="password"
                  value={formObj.password}
                  onChange={handleChange}
                  type="password"
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
                Login
              </Button>
            </Form>
            <h6 className="mt-3 text-center text-secondary">
              Don't have an account?
              <Link
                style={{ padding: "5px", color: "#ff385c" }}
                to="/create_account"
              >
                Create Account
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

export default Login;
