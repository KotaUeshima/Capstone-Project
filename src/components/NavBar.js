import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState, showSidebar } from "../components/atoms";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const [recoilState, setUserState] = useRecoilState(userState);
  const [show, setShow] = useRecoilState(showSidebar);
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUserState({
      username: "",
      id: "",
    });
    navigate("/");
  }

  /* <NavDropdown.Divider /> */
  const dropDownTitle = recoilState.username ? recoilState.username : "Guest";

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Globify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justfy-content-start">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/map">
                Map
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <NavDropdown title={dropDownTitle} id="basic-nav-dropdown">
                {recoilState.username ? (
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                )}
                {recoilState.username && window.location.pathname == "/map" ? (
                  <NavDropdown.Item onClick={() => setShow(true)}>
                    MyPost
                  </NavDropdown.Item>
                ) : null}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
