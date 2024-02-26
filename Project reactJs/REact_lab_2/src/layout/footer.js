import React from "react";
import { Navbar } from "react-bootstrap";
import "../layout/footer.css";
function Footer() {
  return (
    <div className="footer">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="mx-auto">Created by Vanh Vanh</Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Footer;
