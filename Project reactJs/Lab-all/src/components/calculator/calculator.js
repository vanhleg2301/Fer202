import React, { useState } from "react";
import { Container, FormSelect } from "react-bootstrap";
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Button,
  Form,
} from "react-bootstrap";
import Header from "../layout/header";

import { Link } from "react-router-dom";

function Calculator() {
  // Khởi tạo state để lưu giá trị của các trường input và phép tính được chọn
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState("");

  // Hàm xử lý khi người dùng nhập giá trị vào các trường input
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "inputField1") {
      setFirstValue(value);
    } else {
      setSecondValue(value);
    }
  };

  // Hàm xử lý khi người dùng chọn phép tính
  const handleSelectChange = (event) => {
    setOperator(event.target.value);
  };

  // Hàm xử lý khi người dùng nhấn nút "compute"
  const handleCompute = () => {
    let resultValue;
    switch (operator) {
      case "+":
        resultValue = parseFloat(firstValue) + parseFloat(secondValue);
        break;
      case "-":
        resultValue = parseFloat(firstValue) - parseFloat(secondValue);
        break;
      case "*":
        resultValue = parseFloat(firstValue) * parseFloat(secondValue);
        break;
      case "/":
        resultValue = parseFloat(firstValue) / parseFloat(secondValue);
        break;
      default:
        resultValue = "";
    }
    setResult(resultValue);
  };

  return (
    <Container className="text-center">
      <Header />
      <h1>Calculator</h1>
      <Link to="/casio">
        <Button variant="secondary">Casio</Button>
      </Link>
      <Form method="POST">
        <FormGroup>
          <FormLabel />
          <FormControl
            id="inputField1"
            placeholder="first"
            value={firstValue}
            onChange={handleInputChange}
          />
          <FormText className="text-muted" />
        </FormGroup>
        <FormGroup>
          <FormLabel />
          <FormControl
            id="inputField2"
            placeholder="second"
            value={secondValue}
            onChange={handleInputChange}
          />
          <FormText className="text-muted" />
        </FormGroup>
        <FormSelect
          aria-label="Default select example"
          onChange={handleSelectChange}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </FormSelect>
        <Button onClick={handleCompute}>Compute</Button>
      </Form>
      Result: <FormControl placeholder="result" value={result} readOnly />
    </Container>
  );
}

export default Calculator;
