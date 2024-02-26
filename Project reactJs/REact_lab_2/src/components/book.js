import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Book() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form fields after submission if needed
    setFormData({
      name: "",
      email: "",
      service: "",
      comments: "",
    });
  };

  return (
    <Container fluid="md">
      <h1 className="text-center">Book your table</h1>
      <form onSubmit={handleSubmit} className="m-4">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="name"></label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="email"></label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email *"
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="service"></label>
              <select
                className="form-control"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Select a Service"
                required
              >
                <option value="">---Select---</option>
                <option value="Service 1">Service 1</option>
                <option value="Service 2">Service 2</option>
                <option value="Service 3">Service 3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comments"></label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            style={{ height: "150px" }}
            placeholder="Please write your comments: "
          ></textarea>
        </div>
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-warning">
            Send massage
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Book;
