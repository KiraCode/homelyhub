import React from "react";

const MyAccomodation = () => {
  return (
    <div className="main-container">
      <div className="myaccomodation-container row">
        <div className="myaccomodation-image-container col-lg-3 col-md-3">
          <img
            className="myaccomodation-img"
            src="../assets/image1.jpeg"
            alt="myaccomdation"
          />
        </div>
        <div className="myaccomodation-information col-lg-9 col-md-9">
          <h6 className="myaccomodation-hotel-name">
            Sea view cottages & complementry meals included
          </h6>
          <div className="stay-information">
            <span className="info">
              <span className="material-symbols-outlined icon">
                calendar_month
              </span>
              2024-01-22
            </span>
            <span className="material-symbols-outlined icon">
              arrow_forward
            </span>
            <span className="info">
              <span className="material-symbols-outlined icon">
                calendar_month
              </span>
              2024-01-24
            </span>
          </div>
          <p className="myaccomodation-city">City :Bangalore</p>
          <p className="myaccomodation-guest">Max no of guest : 2</p>
          <h5 className="myaccomodation-price">
            <span className="material-symbols-outlined">payments</span> Total
            Price :&#8377; 13999
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MyAccomodation;
