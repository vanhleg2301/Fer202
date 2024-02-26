import React from "react";
import { Carousel, Button } from "react-bootstrap";

function Banner() {
  const bannerImages = [
    {
      src: "https://via.placeholder.com/800x400",
      alt: "First Pizza",
      caption: "First Pizza",
      description: "lab 2",
    },
    {
      src: "https://via.placeholder.com/800x400",
      alt: "Second slide",
      caption: "Second Pizza",
      description: "lab 2",
    },
    {
      src: "https://via.placeholder.com/800x400",
      alt: "Third slide",
      caption: "Third Pizza",
      description: "lab 2",
    },
  ];

  return (
    <div>
      <Carousel>
        {bannerImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image.src} alt={image.alt} />
            <Carousel.Caption>
              <h3>{image.caption}</h3>
              <p>{image.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
