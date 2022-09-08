import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { userState } from "../components/atoms";

function Landing() {
  const recoilState = useRecoilValue(userState);

  return (
    <>
      <div
        style={{
          height: "93vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          style={{
            width: "40vw",
            marginLeft: "10%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container style={{ width: "40%", marginRight: "50%" }}>
            <h1 style={{ fontSize: "6rem" }}>Globify</h1>
            <h3 className="mb-3">Listen to music from around the world.</h3>
            <Link to="/map">
              <Button
                style={{ backgroundColor: "#ff385c", borderColor: "#ff385c" }}
              >
                See Map
              </Button>
            </Link>
            {recoilState.username ? null : (
              <Link to="/login">
                <Button
                  className="m-3"
                  style={{ backgroundColor: "#ff385c", borderColor: "#ff385c" }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Container>
        </Container>
        <Image
          style={{ marginRight: "50px" }}
          width="40%"
          fit="cover"
          src="https://i.pinimg.com/736x/cd/2c/fe/cd2cfe4ed7feaeaaba31b0e7b520d2c2.jpg"
        />
      </div>
      <div
        style={{
          height: "93vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          style={{ marginRight: "50px" }}
          width="40%"
          fit="cover"
          src="https://i.pinimg.com/736x/cd/2c/fe/cd2cfe4ed7feaeaaba31b0e7b520d2c2.jpg"
        />
        <Container
          style={{
            width: "40vw",
            marginRight: "10%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container style={{ width: "40%", marginRight: "50%" }}>
            <h1 style={{ fontSize: "6rem" }}>Globify</h1>
            <h3 className="mb-3">Listen to music from around the world.</h3>
            <Link to="/map">
              <Button
                style={{ backgroundColor: "#ff385c", borderColor: "#ff385c" }}
              >
                See Map
              </Button>
            </Link>
            {recoilState.username ? null : (
              <Link to="/login">
                <Button
                  className="m-3"
                  style={{ backgroundColor: "#ff385c", borderColor: "#ff385c" }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Container>
        </Container>
      </div>
    </>
  );
}

export default Landing;
