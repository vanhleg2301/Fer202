import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9999/products/${id}`);
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const updateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:9999/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      console.log("Product updated successfully!");

      // Sau khi cập nhật thành công, cập nhật lại dữ liệu trong state
      // để hiển thị ngay lập tức trên giao diện
      const updatedResponse = await fetch(
        `http://localhost:9999/products/${id}`
      );
      const updatedData = await updatedResponse.json();
      setFormData(updatedData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {loading ? (
        <p>Loading...</p>
      ) : formData.id ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input type="text" value={formData.id} readOnly />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default EditProduct;
