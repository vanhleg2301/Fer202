import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Header from "../layout/header";
import { Link, Outlet } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:9999/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Nếu xóa thành công, cập nhật danh sách sản phẩm bằng cách loại bỏ sản phẩm đã xóa
        setProducts(products.filter((product) => product.id !== productId));
        alert("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Header />
      <Outlet />
      <h1>List of products</h1>
      <h2>
        <Link to="/products/create">
          <Button variant="secondary">Create Product</Button>
        </Link>
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              Name <Icon.ArrowDown />
            </th>
            <th>Price </th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <img src={product.imageUrl} alt={product.name} />
                </td>
                <td>{product.description}</td>
                <td>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="info">View</Button>
                  </Link>{" "}
                  <Link to={`/products/${product.id}/edit`}>
                    <Button variant="primary">Edit</Button>
                  </Link>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Products;
