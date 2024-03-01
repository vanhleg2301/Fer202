import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";

const AllStar = ({ handleView }) => {
  const [allStar, setAllStar] = useState([]);

  useEffect(() => {
    const fetchAllStar = async () => {
      try {
        const response = await fetch("http://localhost:9999/stars");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAllStar(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllStar();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/stars/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete star");
      }
      alert("Confirm to delete");
      // Remove the deleted star from the local state
      setAllStar(allStar.filter((star) => star.id !== id));
    } catch (error) {
      console.error("Error deleting star", error);
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>id</td>
                <td>FullName</td>
                <td>Male</td>
                <td>Dob</td>
                <td>Description</td>
                <td>Nationality</td>
                <td colSpan={2} className="text-center">
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {allStar.map((star) => (
                <tr key={star.id}>
                  <td>{star.id}</td>
                  <td>{star.FullName}</td>
                  <td>{star.Male ? "Male" : "Female"}</td>
                  <td>{star.Dob}</td>
                  <td>{star.Description}</td>
                  <td>{star.Nationality}</td>
                  <td>
                    <Button
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={() => handleView(star)}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(star.id)}
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
    </div>
  );
};

export default AllStar;
