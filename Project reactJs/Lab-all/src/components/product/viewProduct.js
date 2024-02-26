import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewProduct() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL params
  const [product, setProduct] = useState(null); // Khởi tạo state để lưu trữ thông tin sản phẩm

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9999/products/${id}`);
        const data = await response.json();
        setProduct(data); // Cập nhật thông tin sản phẩm từ dữ liệu nhận được
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Sử dụng id trong dependency array để fetch dữ liệu mới khi id thay đổi

  return (
    <div>
      <h2>Product Details</h2>
      {product ? (
        <div>
          <p>ID: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewProduct;
