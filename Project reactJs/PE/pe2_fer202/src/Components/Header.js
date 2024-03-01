import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Container>
      <Navbar bg="primary">
        <Container>
          <Nav className="">
            <Nav.Link href="/" style={{ color: "white" }}>
              HOME
            </Nav.Link>
            <Nav.Link href="#features" style={{ color: "white" }}>
              DASHBOARD
            </Nav.Link>
            <Nav.Link href="#pricing" style={{ color: "white" }}>
              CONTACT
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
