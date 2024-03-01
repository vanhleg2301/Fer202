import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackToTop from "../BackToTop/BackToTop";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [producers, setProducers] = useState([]);
  const [filteredProducers, setFilteredProducers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.Title &&
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
        `http://localhost:9999/movies?ProducerId=${producerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies for the producer");
      }
      const data = await response.json();
      // Chuyển đổi giá trị của data sang kiểu số nguyên
      const parsedData = data.map((item) => ({
        ...item,
        // Chuyển đổi giá trị producerId sang kiểu số nguyên
        producerId: parseInt(item.producerId),
      }));

      setFilteredProducers(parsedData);
      console.log(parsedData);
    } catch (error) {
      console.error("Error fetching movies for the producer:", error);
    }
  };

  const handleEdit = () => {
    alert("Edit me");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/movies/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      alert("Confirm to delete");
      // Remove the deleted star from the local state
      setMovies(movies.filter((star) => star.id !== id));
    } catch (error) {
      console.error("Error deleting star", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="m-4">
        <h1 className="text-center">Movies Management</h1>
        <Row>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-center m-4">
              <Button>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/movie/add"
                >
                  Create new Movie
                </Link>
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={2} xl={2}>
            <h3>Producers</h3>
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) => handleProducerSearch(e.target.value)}
              >
                <option value="">Select Producer</option>

                {producers.map((producer) => (
                  <option key={producer.id} value={producer.id}>
                    {producer.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
                  <th>Detail</th>
                  <th>Delete</th>
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
                        <td>
                          <Button>
                            <Link
                              style={{ color: "white", textDecoration: "none" }}
                              to={`/movie/${movie.id}`}
                            >
                              Detail
                            </Link>
                          </Button>
                        </td>
                        <td>
                          <Button onClick={handleEdit}>Edit</Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(movie.id)}
                          >
                            Delete
                          </Button>
                        </td>
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
                        <td>
                          <Button>
                            <Link
                              style={{ color: "white", textDecoration: "none" }}
                              to={`/movie/${movie.id}`}
                            >
                              Detail
                            </Link>
                          </Button>
                        </td>

                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(movie.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <BackToTop />
      </div>
    </div>
  );
};

export default Movie;
