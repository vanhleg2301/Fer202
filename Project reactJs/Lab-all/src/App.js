import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import {
  Chat,
  Products,
  CreateProduct,
  ViewProduct,
  EditProduct,
  Calculator,
  Casio,
  AddList,
  About,
} from "./components/index";
import Login from "./components/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/products" element={<Products />}>
          <Route path="create" element={<CreateProduct />} />
          <Route path=":id" element={<ViewProduct />} />
          <Route path=":id/edit" element={<EditProduct />} />
        </Route>
        <Route path="/casio" element={<Casio />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/addList" element={<AddList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
