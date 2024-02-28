import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";

const Producers = () => {
  const [producers, setProducers] = useState([]);
  const [filteredProducers, setFilteredProducers] = useState([]);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await fetch("http://localhost:9999/producers");
        if (!response.ok) {
          throw new Error("Failed to fetch producers");
        }
        const data = await response.json();
        setProducers(data);
      } catch (error) {
        console.error("Error fetching producers:", error);
      }
    };

    fetchProducers();
  }, []);

  const handleProducerSearch = async (producerId) => {
    try {
      const response = await fetch(
        `http://localhost:9999/movies?producerId=${producerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies for the producer");
      }
      const data = await response.json();
      setFilteredProducers(data);
    } catch (error) {
      console.error("Error fetching movies for the producer:", error);
    }
  };

  return (
    <Col lg={2} xl={2}>
      <h3>Producers</h3>
      <Form.Group>
        <select
          className="form-control"
          onChange={(e) => handleProducerSearch(e.target.value)}
        >
          <option value="">Select Producer</option>
          {producers.map((producer) => (
            <option key={producer.id} value={producer.id}>
              {producer.Name}
            </option>
          ))}
        </select>
      </Form.Group>
    </Col>
  );
};

export default Producers;
