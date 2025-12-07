import React from "react";
import "../../CSS/BookingDetails.css";
import PropertyImg from "../PropertyListing/PropertyImg";

const BookingDetails = () => {
  return (
    <div className="details-container">
      <p className="details-header">
        Sea View Cottages & Complementry Meals Included
      </p>
      <h6 className="details-location">
        <span className="material-symbols-outlined">location_on</span>
        <span className="location">Manali, Himachal Pradesh, India</span>
      </h6>
      <div className="details-information-container ">
        <div className="details-information ">
          <h5 className>Booking Information</h5>
          <section className="booking-stay-information">
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                bedtime
              </span>
              7 nights
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              2024-01-22
            </span>
            <span class="material-symbols-outlined  stay-icon">
              arrow_forward
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              2024-01-24
            </span>
          </section>
        </div>
        <div className="details-total-price-container ">
          <div className="details-total-price">
            <p className="price-header">Total Price</p>
            <span className="price-in-number"> &#8377; 13999</span>
          </div>
        </div>
      </div>
      <PropertyImg />
    </div>
  );
};

export default BookingDetails;
