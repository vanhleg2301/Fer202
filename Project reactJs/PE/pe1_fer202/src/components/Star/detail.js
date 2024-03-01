import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/header";
import { Container, Row, Col, Button } from "react-bootstrap";

const DetailStar = () => {
  const { id } = useParams();
  const [Star, setStar] = useState(null);

  useEffect(() => {
    const fetchStar = async () => {
      try {
        const response = await fetch(`http://localhost:9999/stars/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Star");
        }
        const data = await response.json();
        setStar(data);
      } catch (error) {
        console.error("Error fetching Star:", error);
      }
    };

    fetchStar();
  }, [id]);

  return (
    <div>
      <Header />
      <Container className="d-flex justify-content-center m-4">
        {Star ? (
          <div>
            <h1 className="text-center">
              {Star.FullName} - {Star.id}
            </h1>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Release Date:</strong> {Star.ReleaseDate}
                </p>
                <p>
                  <strong>Description:</strong> {Star.Description}
                </p>
                <Button>Edit</Button>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Language:</strong> {Star.Language}
                </p>
                <p>
                  <strong>Producer ID:</strong> {Star.ProducerId}
                </p>
                <p>
                  <strong>Director ID:</strong> {Star.DirectorId}
                </p>
              </Col>
            </Row>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default DetailStar;
