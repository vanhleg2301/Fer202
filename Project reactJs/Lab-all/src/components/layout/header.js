import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/" className="mr-auto">
          <img
            src="https://res.cloudinary.com/shopdunk/image/upload/v1634252771/shopdunk/logo-shopdunk.svg"
            alt="ShopVanh"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" className="mx-3">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="mx-3">
              Shop
            </Nav.Link>
            <Nav.Link href="/products" className="mx-3">
              Products_3
            </Nav.Link>
            <Nav.Link href="/products" className="mx-3">
              Products_2
            </Nav.Link>
            <Nav.Link href="/products" className="mx-3">
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            <Link to="/addList" className="nav-link mx-2">
              <Button variant="secondary">List</Button>
            </Link>
            <Link to="/calculator" className="nav-link mx-2">
              <Button variant="secondary">calculator</Button>
            </Link>
            <Link to="/about" className="nav-link mx-2">
              <Button variant="secondary">About</Button>
            </Link>
            <Link to="/chat" className="nav-link mx-2">
              <Button variant="secondary">Chat</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
