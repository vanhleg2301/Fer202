import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/header";
import Footer from "./Footer/Footer";
import Home from "./Home/home";

function LayoutProvider({ children }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <Footer />
    </div>
  );
}

const Layout = () => {
  return (
    <LayoutProvider>
      <Outlet />
      <Home />
    </LayoutProvider>
  );
};

export default Layout;
