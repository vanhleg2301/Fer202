import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Create = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    releaseDate: "",
    description: "",
    language: "",
    producerId: 0,
    directorId: 0,
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:9999/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const maxId = Math.max(...movies.map((movie) => parseInt(movie.id)));
      const newId = String(maxId + 1); // Ensure ID is a string

      const response = await fetch("http://localhost:9999/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: newId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create movie");
      }
      setFormData({
        id: "",
        title: "",
        releaseDate: "",
        description: "",
        language: "",
        producerId: 0,
        directorId: 0,
      });
      alert("Movie created successfully!");
      window.location.href = "/movie";
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };
  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center">Create Movie</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formReleaseDate">
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProducerId">
                <Form.Label>Producer ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter producer ID"
                  name="producerId"
                  value={formData.producerId}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDirectorId">
                <Form.Label>Director ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter director ID"
                  name="directorId"
                  value={formData.directorId}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-center mt-4">
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Create;
