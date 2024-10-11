import React from "react";
import { CCarousel, CCarouselItem } from "@coreui/react";

const PortfolioCarousel = ({ photos, profileUrl }) => {
  return (
    <CCarousel controls indicators dark interval={3000}>
      {photos.map((photo, index) => (
        <CCarouselItem key={index} className="">
          <img
            src={profileUrl + photo}
            alt={`Slide ${index + 1}`}
            className="d-block w-100 " // Using Bootstrap's utility class for full width
            style={{ objectFit: "cover", height: "400px" }} // Custom height
          />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
};

export default PortfolioCarousel;
