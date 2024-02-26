import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
  const cards = [
    { title: "Pizza", price: 23, imageUrl: "..." },
    { title: "Pizza", price: 22, imageUrl: "..." },
    { title: "Pizza", price: 40, imageUrl: "..." },
    { title: "Pizza", price: 12, imageUrl: "..." },
    { title: "Pizza", price: 50, imageUrl: "..." },
    { title: "Pizza", price: 31, imageUrl: "..." },
    { title: "Pizza", price: 17, imageUrl: "..." },
    { title: "Pizza", price: 42, imageUrl: "..." },
  ];

  const calculateDiscountedPrice = (price) => {
    return (price * 0.9).toFixed(2); // 10% discount with 2 decimal places
  };

  return (
    <div>
      <Container fluid="md" style={{ height: "1000px" }} className="mt-4">
        <h1>Our Menu</h1>
        <Row className="">
          {cards.map((card, index) => (
            <Col key={index} xs={6} md={3} className="mt-4">
              <Card>
                <Card.Img variant="top" src={card.imageUrl} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>
                    <span style={{ textDecoration: "line-through" }}>
                      ${card.price}
                    </span>{" "}
                    ${calculateDiscountedPrice(card.price)}
                  </Card.Text>
                  <Button variant="secondary" className="btn-xl">
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
