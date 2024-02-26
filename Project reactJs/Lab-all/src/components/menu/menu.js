import React from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Nav,
  Image,
  Overlay,
} from "react-bootstrap";

const Menu = () => {
  return (
    <div className="w-500">
      <Nav className="flex-column ">
        {/* flex-column cho các nav nằm dọc */}
        <Nav.Link className="nav-link-2" href="/">
          Banner
        </Nav.Link>
        <Nav.Link className="nav-link" href="/products">
          Product 2
        </Nav.Link>

        <Nav.Link className="nav-link">Product 2.2</Nav.Link>
        <Nav.Link className="nav-link">Product 3</Nav.Link>
        <Nav.Link className="nav-link">Product 4</Nav.Link>
        <Nav.Link className="nav-link">Product 5</Nav.Link>
        <Nav.Link className="nav-link">Product 6</Nav.Link>
      </Nav>
    </div>
  );
};

export default Menu;
