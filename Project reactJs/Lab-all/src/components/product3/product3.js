import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product3 = () => {
  const [products_3, setProducts_3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/products_3");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setProducts_3(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div id="product-3">
      <h2 className=" text-center">Product 3</h2>
      {chunkArray(products_3, 4).map((group, index) => (
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

export default Product3;
