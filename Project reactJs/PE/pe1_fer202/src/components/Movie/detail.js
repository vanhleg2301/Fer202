import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/header";
import { Container, Row, Col, Button } from "react-bootstrap";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:9999/movies/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      <Header />
      <Container className="d-flex justify-content-center m-4">
        {movie ? (
          <div>
            <h1 className="text-center">
              {movie.Title} - {movie.id}
            </h1>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Release Date:</strong> {movie.ReleaseDate}
                </p>
                <p>
                  <strong>Description:</strong> {movie.Description}
                </p>
                <Button>Edit</Button>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Language:</strong> {movie.Language}
                </p>
                <p>
                  <strong>Producer ID:</strong> {movie.ProducerId}
                </p>
                <p>
                  <strong>Director ID:</strong> {movie.DirectorId}
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

export default Detail;
