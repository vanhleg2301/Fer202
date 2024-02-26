import React from "react";
import Menu from "./MenuComponent";
import Header from "./layout/header";
import Footer from "./layout/footer";
function Page() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <div className="row bg-secondary" style={{ height: "200px" }}>
        <div className="col-6 border">First col</div>
        <div className="col-6 border">Second col</div>

        <div className="col-4 border">col</div>
        <div className="col-4 border">col</div>
        <div className="col-4 border">col</div>

        <div className="col-3 border">col</div>
        <div className="col-3 border">col</div>
        <div className="col-3 border">col</div>
        <div className="col-3 border">col</div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
