import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../layout/header";

function Casio() {
  // State để lưu trữ biểu thức và kết quả
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  // Hàm thêm phím vào biểu thức
  const appendToExpression = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  // Hàm tính toán kết quả
  const calculateResult = () => {
    try {
      const calculatedResult = eval(expression); // npm install mathjs - import math from 'mathjs';

      setResult(calculatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  // Hàm xóa toàn bộ biểu thức
  const clearExpression = () => {
    setExpression("");
    setResult("");
  };

  return (
    <div>
      <Header />
      <div className="text-center">
        <h1>This is Casio</h1>
        <Container>
          <Row>
            <Col>
              <input type="text" value={expression} readOnly />
              <br />
              <input type="text" value={result} readOnly />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => appendToExpression("1")}>1</Button>
              <Button onClick={() => appendToExpression("2")}>2</Button>
              <Button onClick={() => appendToExpression("3")}>3</Button>
              <Button onClick={() => appendToExpression("+")}>+</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => appendToExpression("4")}>4</Button>
              <Button onClick={() => appendToExpression("5")}>5</Button>
              <Button onClick={() => appendToExpression("6")}>6</Button>
              <Button onClick={() => appendToExpression("-")}>-</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => appendToExpression("7")}>7</Button>
              <Button onClick={() => appendToExpression("8")}>8</Button>
              <Button onClick={() => appendToExpression("9")}>9</Button>
              <Button onClick={() => appendToExpression("*")}>*</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => appendToExpression("0")}>0</Button>
              <Button onClick={() => appendToExpression(".")}>.</Button>
              <Button onClick={calculateResult}>=</Button>
              <Button onClick={clearExpression}>C</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Casio;
