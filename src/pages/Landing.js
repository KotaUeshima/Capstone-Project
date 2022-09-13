import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { userState } from "../components/atoms";
import CreateAccount from "./CreateAccount";

function Landing() {
  const recoilState = useRecoilValue(userState);
  const toCreateAccount = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { from } = location.state;
      if (from == "moveDown") {
        toCreateAccount.current?.scrollIntoView();
      }
    }
  });

  return (
    <div>
      <div
        style={{
          height: "90vh",
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
              {recoilState.username ? null : (
                <Link to="/login">
                  <Button
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
        <Image
          style={{ marginRight: "50px" }}
          width="40%"
          fit="cover"
          src="https://i.pinimg.com/736x/cd/2c/fe/cd2cfe4ed7feaeaaba31b0e7b520d2c2.jpg"
        />
      </div>
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
    </div>
  );
}

export default Landing;
