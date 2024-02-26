import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Container, Row, Col, Table, Form } from "react-bootstrap";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [producers, setProducers] = useState([]);
  const [filteredProducers, setFilteredProducers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    fetchMovies();
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
    <div>
      <Header />
      <div className="m-4">
        <h1 className="text-center">Movies Management</h1>
        <div className="d-flex justify-content-center m-4">
          <Form.Group controlId="formSearch" className="w-100">
            <Form.Control
              type="text"
              placeholder="Search by Title"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </div>
        <Row>
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
          <Col lg={10} xl={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Release Date</th>
                  <th>Description</th>
                  <th>Language</th>
                  <th>Producer ID</th>
                  <th>Director ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducers.length > 0
                  ? filteredProducers.map((movie) => (
                      <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.Title}</td>
                        <td>{movie.ReleaseDate}</td>
                        <td>{movie.Description}</td>
                        <td>{movie.Language}</td>
                        <td>{movie.ProducerId}</td>
                        <td>{movie.DirectorId}</td>
                      </tr>
                    ))
                  : filteredMovies.map((movie) => (
                      <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.Title}</td>
                        <td>{movie.ReleaseDate}</td>
                        <td>{movie.Description}</td>
                        <td>{movie.Language}</td>
                        <td>{movie.ProducerId}</td>
                        <td>{movie.DirectorId}</td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Movie;