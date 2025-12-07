import React, { useState } from "react";
import Modal from "./Modal";

const PropertyImg = () => {
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
            src="/assets/image1.jpeg"
            alt="houses"
          />
        </div>
        <div>
          <img className="images" src="/assets/image2.jpeg" alt="houses" />
        </div>
        <div>
          <img
            className="images"
            style={{ borderTopRightRadius: "10px" }}
            src="/assets/image3.jpeg"
            alt="houses"
          />
        </div>
        <div>
          <img className="images" src="/assets/image4.jpeg" alt="houses" />
        </div>
        <div>
          <img
            className="images"
            style={{ borderBottomRightRadius: "10px" }}
            src="/assets/image5.jpeg"
            alt="houses"
          />
          <button className=" similar-photos" onClick={handleShowAllPhotos}>
            <span class="material-symbols-outlined">photo_library</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          images={[
            "/assets/image1.jpeg",
            "/assets/image2.jpeg",
            "/assets/image3.jpeg",
            "/assets/image4.jpeg",
            "/assets/image5.jpeg",
          ]}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default PropertyImg;
