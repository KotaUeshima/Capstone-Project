import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "../components/atoms";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const [recoilState, setUserState] = useRecoilState(userState);
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
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/map">
                Map
              </Nav.Link>
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
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
