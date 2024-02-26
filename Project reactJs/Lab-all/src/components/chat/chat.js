import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Header from "../layout/header";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = () => {
    if (inputValue.trim() === "") return;
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    // Here you can add logic to handle bot responses
    // For now, let's just simulate a bot response after a short delay
    setTimeout(() => {
      setMessages([
        ...messages,
        { text: "This is a bot response", sender: "bot" },
      ]);
    }, 1000);
    setInputValue("");
  };

  return (
    <Container>
      <Header />
      <div className="mt-4">
        <Row>
          <Col>
            <div className="conversation">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleMessageSubmit();
                  }
                }}
              />
              <InputGroup>
                <Button variant="primary" onClick={handleMessageSubmit}>
                  Send
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Chat;
