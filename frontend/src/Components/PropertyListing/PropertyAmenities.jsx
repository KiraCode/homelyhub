import React from "react";

const PropertyAmenities = () => {
  return (
    <>
      <h2 className="property-amenities">What this place offers</h2>
      <div className="amenities">
        <p>
          <span className="material-symbols-outlined">wifi </span>
          <span>Wifi</span>
        </p>
        <p>
          <span className="material-symbols-outlined">tv</span> <span>Tv</span>
        </p>
        <p>
          <span className="material-symbols-outlined">radio</span>
          <span>Radio</span>
        </p>
        <p>
          <span className="material-symbols-outlined">garage_home</span>
          <span>Free parking spot</span>
        </p>
        <p>
          <span className="material-symbols-outlined">thumb_up</span>
          <span>Pets</span>
        </p>
        <p>
          <span className="material-symbols-outlined">login</span>
          <span>Private enterence</span>
        </p>
      </div>
    </>
  );
};

export default PropertyAmenities;
