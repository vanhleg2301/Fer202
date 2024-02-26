import Header from "./layout/header";
import Footer from "./layout/footer";
import Cart from "./components/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Banner from "./layout/banner";
import Book from "./components/book";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Banner />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Cart />
          </div>
          <div className="col-md-12">
            <Book />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
