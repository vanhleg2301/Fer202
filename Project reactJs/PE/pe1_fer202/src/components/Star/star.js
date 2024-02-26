import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

const AddStarForm = () => {
  const [starData, setStarData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    description: "",
    nationality: "",
  });

  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    // Fetch total number of stars from the database when component mounts
    const fetchTotalStars = async () => {
      try {
        const response = await fetch("http://localhost:9999/stars");
        if (!response.ok) {
          throw new Error("Failed to fetch total stars");
        }
        const data = await response.json();
        setTotalStars(data.length);
      } catch (error) {
        console.error("Error fetching total stars:", error);
      }
    };

    fetchTotalStars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStarData({ ...starData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = totalStars + 1; // Generate id based on total number of stars
      const newStarData = { ...starData, id }; // Include id in star data
      const response = await fetch("http://localhost:9999/stars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStarData),
      });
      if (!response.ok) {
        throw new Error("Failed to add star");
      }
      alert("Star added successfully!");
      // Reset form fields after successful submission
      setStarData({
        fullName: "",
        gender: "",
        dob: "",
        description: "",
        nationality: "",
      });
      // Update totalStars to reflect the new total after adding a star
      setTotalStars(totalStars + 1);
    } catch (error) {
      console.error("Error adding star:", error);
      alert("Failed to add star");
    }
  };

  const handleReset = () => {
    // Clear form fields
    setStarData({
      fullName: "",
      gender: "",
      dob: "",
      description: "",
      nationality: "",
    });
  };

  return (
    <div>
      <Header />
      <Container>
        <h1>Add a New Star</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mt-4">
                <Form.Label>ID</Form.Label>
                <Form.Control value={0} readOnly disabled />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={starData.dob}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  as="select"
                  name="nationality"
                  value={starData.nationality}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option value="USA">USA</option>
                  <option value="England">England</option>
                  <option value="France">France</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-4">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={starData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="description"
                  value={starData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-4 text-center">
            <Button variant="primary" type="submit" className="mr-2">
              Add Star
            </Button>
            <Button
              variant="danger"
              type="reset"
              onClick={handleReset}
              className="ml-2"
            >
              Reset
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddStarForm;
