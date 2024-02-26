import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product2 = () => {
  const [products_2, setProducts_2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/products_2");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts_2(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Col className="">
        <div id="product2">
          <h2 className=" text-center">Product 2</h2>
          {chunkArray(products_2, 4).map((group, index) => (
            <Row key={index} className="mt-4">
              {group.map((product) => (
                <Col key={product.id} lg={3} md={3} sm={3} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={product.imageUrl} />
                    <Card.Body>
                      <Card.Title className="text-truncate">
                        {product.name}
                      </Card.Title>
                      <Card.Text className="text-truncate">
                        {product.description}
                      </Card.Text>
                      <Card.Text>Price: ${product.price}</Card.Text>
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
      </Col>
    </div>
  );
  // Function to chunk an array into groups of size
  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }
};

export default Product2;
