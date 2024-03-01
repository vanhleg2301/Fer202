import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/header";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    Title: "",
    ReleaseDate: "",
    Description: "",
    Language: "",
    ProducerId: "",
    DirectorId: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:9999/movies/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        setMovie(data);
        setFormData(data); // Set initial form data
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:9999/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update movie");
      }
      // Update movie state with the new data
      setMovie(formData);
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div>
      <Header />
      <Container className="d-flex justify-content-center ">
        {movie ? (
          <div>
            <h1 className="text-center">
              {movie.Title} - {movie.id}
            </h1>
            <Container>
              <Row className="text-center">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      value={formData.Title}
                      type="text"
                      name="Title"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Release Date:</Form.Label>
                    <Form.Control
                      value={formData.ReleaseDate}
                      type="date"
                      name="ReleaseDate"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      value={formData.Description}
                      type="text"
                      name="Description"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Language:</Form.Label>
                    <Form.Control
                      value={formData.Language}
                      type="text"
                      name="Language"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Producer ID:</Form.Label>
                    <Form.Control
                      value={formData.ProducerId}
                      type="number"
                      name="ProducerId"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Director ID:</Form.Label>
                    <Form.Control
                      value={formData.DirectorId}
                      type="number"
                      name="DirectorId"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
      <div className="text-center mt-4">
        {movie && <Button onClick={handleUpdate}>Save</Button>}
      </div>
    </div>
  );
};

export default Detail;
