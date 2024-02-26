import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./layout.css";
import Menu from "../menu/menu";

function Banner() {
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/banner");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setBanner(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  // style={isHovered ? { filter: "blur(5px)" } : {}}
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container>
      <Row>
        <Col className="">
          <div>
            <Nav className="flex-column ">
              {/* flex-column cho các nav nằm dọc */}
              <Nav.Link className="nav-link-2" href="/">
                Banner
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                to="/products"
              >
                Product 2
              </Nav.Link>

              <Nav.Link className="nav-link">Product 2.2</Nav.Link>
              <Nav.Link className="nav-link">Product 3</Nav.Link>
              <Nav.Link className="nav-link">Product 4</Nav.Link>
              <Nav.Link className="nav-link">Product 5</Nav.Link>
              <Nav.Link className="nav-link">Product 6</Nav.Link>
            </Nav>
          </div>
        </Col>

        {isHovered ? (
          <Col>
            <Menu />
          </Col>
        ) : (
          <Col className="">
            <div>
              <Carousel>
                {banners.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img className="w-300" src={image.src} alt={image.alt} />
                    <Carousel.Caption>
                      <h3>{image.caption}</h3>
                      <p>{image.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
        )}

        <Col className="">
          <div>
            <Nav className="flex-column text-center">
              <Nav.Link>
                <Image src="your_image_url.jpg" fluid />
                {/* Replace "your_image_url.jpg" with the URL of your image */}
              </Nav.Link>
              <Nav.Link>
                <Image src="your_image_url.jpg" fluid />{" "}
              </Nav.Link>
              <Nav.Link>
                <Image src="your_image_url.jpg" fluid />{" "}
              </Nav.Link>
              <Nav.Link>
                <Image src="your_image_url.jpg" fluid />{" "}
              </Nav.Link>
            </Nav>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Banner;
