import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../layout/header";

function About() {
  return (
    <Container>
      <Header />
      <h1>About Us</h1>
      <Row>
        <Col>
          <h2>Email</h2>
          <p>hihi@gmail.com</p>
        </Col>
        <Col>
          <h2>Facebook</h2>
          <p>
            <a href="https://www.facebook.com/diemquynh.le.2210">
              facebook.com/example
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Instagram</h2>
          <p>
            <a href="https://www.instagram.com">instagram.com/example</a>
          </p>
        </Col>
        <Col>
          <h2>Phone Number</h2>
          <p>0978522556</p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
