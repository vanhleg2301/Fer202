import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [maxId, setMaxId] = useState(0); // State để lưu trữ id lớn nhất
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9999/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // Tìm id lớn nhất trong danh sách sản phẩm
        const maxProductId = data.reduce(
          (maxId, product) => Math.max(maxId, parseInt(product.id)),
          0
        );
        setMaxId(maxProductId);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.imageUrl
    ) {
      setValidationError("All fields are required");
      return;
    }
    if (isNaN(parseFloat(formData.price))) {
      setValidationError("Price must be a number");
      return;
    }

    // Tăng ID lên 1 để tạo ID mới
    const newProductId = maxId + 1;

    // Nếu không có lỗi validation, tiến hành gửi dữ liệu lên server
    try {
      const response = await fetch("http://localhost:9999/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newProductId.toString(),
          ...formData,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("New product added:", data);
        alert("Add successfully");
        clearForm();
      } else {
        console.error("Failed to add new product");
      }
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      imageUrl: "",
    });
    setValidationError("");
  };

  return (
    <div>
      <h2>Create Product</h2>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateProduct;
