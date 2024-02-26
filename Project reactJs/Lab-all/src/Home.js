import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Banner from "./components/layout/banner";
import "./Home.css";
import { Product2, Product3 } from "./components";
import MyContext from "./components/hook/context";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header />

      <Banner />
      <div className="container mt-4">
        <div>
          <div id="products-1">
            <h2 className=" text-center">Product 1</h2>
            {chunkArray(products, 4).map((group, index) => (
              <Row key={index} className="mt-4">
                {group.map((product) => (
                  <Col key={product.id} lg={3} md={3} sm={3} className="mb-4">
                    <Card>
                      <Card.Img variant="top" src={product.imageUrl} />
                      <Card.Body>
                        {"giới hạn độ dài chữ: text-truncate"}
                        <Card.Title className="text-truncate">
                          {product.name}
                        </Card.Title>
                        <Card.Text className="text-truncate">
                          {product.description}
                        </Card.Text>

                        <Card.Text className="number-limit">
                          Price: ${product.price}
                        </Card.Text>
                        <Link to={`/products/${product.id}`}>
                          <Button variant="primary">View Details</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ))}
          </div>
          <Product2 />
          <Product3 />
        </div>
      </div>
      <Footer />
    </Container>
  );
}

// Function to chunk an array into groups of size
function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

export default Home;
