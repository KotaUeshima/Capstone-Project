import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";

function Landing() {
  return (
    <div
      style={{
        height: "93vh",
        display: "flex",
        alignItems: "center",
        // backgroundColor: "navy",
      }}
    >
      <Container
        style={{
          // backgroundColor: "yellow",
          width: "40vw",
          marginLeft: "10%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container style={{ width: "40%", marginRight: "50%" }}>
          <h1 style={{ fontSize: "6rem" }}>Globify</h1>
          <h3>Listen to music from around the world.</h3>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/map">
            <Button className="m-3">See Map</Button>
          </Link>
        </Container>
        <Image
          style={{ marginRight: "50px" }}
          height="600px"
          width="600px"
          fit="cover"
          src="https://i.pinimg.com/736x/cd/2c/fe/cd2cfe4ed7feaeaaba31b0e7b520d2c2.jpg"
        />
      </Container>
    </div>
  );
}

export default Landing;
