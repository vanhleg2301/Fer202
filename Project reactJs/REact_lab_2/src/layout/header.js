import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs"; // Import the search icon from react-icons

function Header() {
  // Define an array of objects containing the link information
  const navLinks = [
    { href: "#home", text: "Home" },
    { href: "#link", text: "About us" },
    { href: "#about", text: "Contact" },
  ];

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{ color: "white" }}>
          Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto">
            {/* Map over the navLinks array to create Nav.Link components */}
            {navLinks.map((link, index) => (
              <Nav.Link key={index} href={link.href} style={{ color: "white" }}>
                {link.text}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              style={{ backgroundColor: "white", color: "black" }} // Style the input field
            />
            <Button variant="danger">
              <BsSearch /> {/* Render the search icon */}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
