import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { userState } from "../components/atoms";
import CreateAccount from "./CreateAccount";
import SpinningGlobe from "../components/SpinningGlobe";
import URL from "../components/URL.js";

function Landing() {
  const recoilState = useRecoilValue(userState);
  const toCreateAccount = useRef(null);
  const [count, setCount] = useState({});

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { from } = location.state;
      if (from == "moveDown") {
        toCreateAccount.current?.scrollIntoView();
      }
    }
  });

  useEffect(() => {
    fetch(`${URL}/count`)
      .then((res) => res.json())
      .then(setCount);
  }, []);

  return (
    <div>
      <div
        style={{
          height: "9vh",
          backgroundColor: "#212529",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {recoilState.username ? (
            <h2 style={{ color: "white", fontWeight: "600", fontSize: "2rem" }}>
              Welcome{" "}
              <span style={{ color: "#ff385c" }}>{recoilState.username}</span>!
            </h2>
          ) : (
            <>
              <h2
                style={{ color: "white", fontWeight: "600", fontSize: "2rem" }}
              >
                Join <span style={{ color: "#ff385c" }}>{count.user}</span>{" "}
                other users worldwide!
              </h2>
              <p className="text-center" style={{ color: "white" }}>
                Add to our growing collection of{" "}
                <span style={{ color: "#ff385c" }}>{count.song}</span> songs.
              </p>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          height: "81vh",
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
          <Container style={{ width: "60%", marginLeft: "10%" }}>
            <h1 style={{ fontSize: "7vw", fontWeight: "900" }}>
              <span style={{ color: "#ff385c" }}>Glo</span>bify
            </h1>
            <h3 className="mb-3" style={{ fontSize: "2vw" }}>
              Listen to music from around the world. Anywhere. Anytime.
            </h3>
            <div>
              <Link to="/map">
                <Button
                  variant="dark"
                  style={{
                    backgroundColor: "#ff385c",
                    borderColor: "#ff385c",
                    width: "40%",
                    fontWeight: "600",
                  }}
                >
                  Go To Map
                </Button>
              </Link>
              {recoilState.username ? (
                <Button
                  className="m-3"
                  style={{
                    backgroundColor: "#ff385c",
                    borderColor: "#ff385c",
                    width: "40%",
                    fontWeight: "600",
                  }}
                  disabled
                >
                  Login
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    variant="dark"
                    className="m-3"
                    style={{
                      backgroundColor: "#ff385c",
                      borderColor: "#ff385c",
                      width: "40%",
                      fontWeight: "600",
                    }}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </Container>
        <div
          style={{
            position: "absolute",
            right: "1rem",
            marginRight: "50px",
            width: "50%",
            height: "90%",
          }}
        >
          <SpinningGlobe />
        </div>
      </div>
      {recoilState.username ? null : (
        <div
          style={{
            height: "90vh",
            display: "flex",
          }}
          ref={toCreateAccount}
        >
          <Container className="p-2 m-auto rounded-lg">
            <h1
              style={{ fontSize: "4vw", fontWeight: "700" }}
              className="text-center"
            >
              Create a Free Account Today
            </h1>
            <p className="text-center">
              Post your music taste, for the world to see!
            </p>
            <CreateAccount />
          </Container>
        </div>
      )}
    </div>
  );
}

export default Landing;
