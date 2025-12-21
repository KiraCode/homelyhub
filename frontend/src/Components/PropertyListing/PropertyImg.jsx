import React, { useState } from "react";
import Modal from "./Modal";

const PropertyImg = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="property-img-container">
        <div className="img-item">
          <img
            className="images"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            src={images[0].url}
            alt="houses"
          />
        </div>
        {/* render the remaining 4 images in a row */}
        {images.slice(1, 4).map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={`property-${index + 2}`}
              className="images"
            />
          </div>
        ))}
        <div>
          <img
            src={images[5].url}
            alt={"property-5"}
            className="images"
            style={{
              borderTopLeftRadius: "10px",
            }}
          />
          <button className="similar-photos" onClick={handleShowAllPhotos}>
            <span className="material-symbols-outlined">photo_library</span>
          </button>
        </div>
      </div>
      {isModalOpen && <Modal images={images} onClose={handleCloseModal} />}
    </>
  );
};

export default PropertyImg;
