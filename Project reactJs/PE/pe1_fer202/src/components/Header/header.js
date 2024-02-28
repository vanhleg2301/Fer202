import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <div className="text-center mt-4">
      <h1>DashBoard</h1>
      <div aria-label="Basic example" className="mt-4">
        <Link to="/director" className="btn-item">
          <Button variant="success">Directors</Button>
        </Link>
        <Link to="/producer" className="btn-item">
          <Button variant="primary" className="btn-item">
            Producers
          </Button>
        </Link>
        <Link to="/star" className="btn-item">
          <Button variant="danger" className="btn-item">
            Stars
          </Button>
        </Link>
        <Link to="/" className="btn-item">
          <Button variant="secondary" className="btn-item">
            genres
          </Button>
        </Link>
        <Link to="/movie" className="btn-item">
          <Button variant="warning" className="btn-item">
            movies
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
