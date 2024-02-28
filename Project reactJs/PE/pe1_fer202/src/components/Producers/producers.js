import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";

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
      <ul>
        {producers.map((producer) => (
          <li key={producer.id}>
            <a
              href={`?producer-id=${producer.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleProducerSearch(producer.id)}
            >
              {producer.Name}
            </a>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Producers;
