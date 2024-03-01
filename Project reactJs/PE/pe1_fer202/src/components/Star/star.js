import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import AllStar from "./AllStar";

const AddStarForm = () => {
  const [starData, setStarData] = useState({
    FullName: "",
    Male: "",
    Dob: "",
    Description: "",
    Nationality: "",
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
      const id = (totalStars + 1).toString(); // Chuyển đổi id thành chuỗi
      const newStarData = {
        ...starData,
        id,
        Male: starData.Male === "true",
      }; // Convert "Male" to true and "Female" to false
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

      // Reset form fields after successful submission
      setStarData({
        FullName: "",
        Male: "",
        Dob: "",
        Description: "",
        Nationality: "",
      });
      // Update totalStars to reflect the new total after adding a star
      setTotalStars(totalStars + 1);
      alert("Star added successfully!");
    } catch (error) {
      console.error("Error adding star:", error);
      alert("Failed to add star");
    }
  };

  const handleReset = () => {
    // Clear form fields
    setStarData({
      FullName: "",
      Male: "",
      Dob: "",
      Description: "",
      Nationality: "",
    });
  };

  const handleView = (star) => {
    setStarData({
      FullName: star.FullName,
      Male: star.Male.toString(),
      Dob: star.Dob,
      Description: star.Description,
      Nationality: star.Nationality,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:9999/stars/${starData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(starData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update star");
      }
      alert("Star updated successfully!");
    } catch (error) {
      console.error("Error updating star:", error);
      alert("Failed to update star");
    }
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
                  name="Dob"
                  value={starData.Dob}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  as="select"
                  name="Nationality"
                  value={starData.Nationality}
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
                  name="FullName"
                  value={starData.FullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  check
                  type="radio"
                  label="Male"
                  name="Male"
                  value="true"
                  checked={starData.Male === "true"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="Male"
                  value="false"
                  checked={starData.Male === "false"}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="Description"
                  value={starData.Description}
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
              variant="secondary"
              type="reset"
              onClick={handleUpdate}
              className="ml-2"
            >
              update
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
      <Container>
        <AllStar handleView={handleView} />
      </Container>
    </div>
  );
};

export default AddStarForm;
