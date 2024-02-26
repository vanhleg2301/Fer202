import React, { useState, useEffect } from "react";
import {
  Container,
  FormGroup,
  FormControl,
  FormText,
  Button,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import Header from "../layout/header";

function AddList() {
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Khôi phục  list and counter từ localStorage khi component đc rendered
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("list"));
    if (storedList) {
      setList(storedList);
    }

    // Lấy giá trị của counter từ localStorage
    const storedCounter = JSON.parse(localStorage.getItem("counter"));
    if (storedCounter !== null) {
      setCounter(storedCounter);
    }
    // [ ] được sử dụng làm dependency array để chỉ định rằng useEffect chỉ được chạy một lần
    // sau khi component được render lần đầu tiên.
    // Điều này đảm bảo rằng hàm này chỉ được gọi khi component được render lần đầu tiên
    // và không phụ thuộc vào bất kỳ state hoặc prop nào khác.
  }, []);

  const addToList = () => {
    const inputValue = document.getElementById("inputField").value;
    if (!inputValue.trim()) return; // Ko add empty
    const newItem = { id: counter, item: inputValue };
    const newList = [...list, newItem];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setCounter(counter + 1); // Tăng counter
    localStorage.setItem("counter", JSON.stringify(counter + 1));
    document.getElementById("inputField").value = ""; // xóa ở thanh text sau khi adding
    alert("Item added successfully.");
  };

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));

    // Cập nhật id để duy trì tính nhất quán
    newList.forEach((item, index) => {
      item.id = index + 1;
    });

    setCounter(newList.length + 1); // Update counter
    localStorage.setItem("counter", JSON.stringify(newList.length + 1));
    alert("Item deleted successfully.");
  };

  const editItem = (id) => {
    const newValue = prompt("Enter new value:");
    if (newValue !== null) {
      const newList = list.map((item) => {
        if (item.id === id) {
          return { ...item, item: newValue };
        }
        return item;
      });
      setList(newList);
      localStorage.setItem("list", JSON.stringify(newList));
      alert("Item edited successfully.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchFilter = (item) => {
    return item.item.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <Container>
      <Header />
      <Container>
        <Row>
          <Col md={4}>
            <Form>
              <FormGroup>
                <FormControl
                  id="inputField"
                  placeholder="Input here"
                  required
                />
                <FormText className="text-muted" />
              </FormGroup>
              <Button onClick={addToList}>Add List</Button>
            </Form>
          </Col>
          <Col md={4}>
            <Form>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <div>
        <Row>
          <Col>
            <Table id="table-1" striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {list.filter(searchFilter).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => editItem(item.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteItem(item.id)}
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
    </Container>
  );
}

export default AddList;
