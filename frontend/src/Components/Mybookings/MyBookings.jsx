import React from "react";
import "../../CSS/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { Link } from "react-router-dom";

const MyBookings = () => {
  return (
    <>
      <ProgressSteps />
      <div className="wow">
        <Link to={"/user/mybookings/bookingdetails"}>
          <div className="main-container">
            <div className="mybookings-container row">
              <div className="image-container col-lg-3 col-md-3">
                <img
                  className="booking-img"
                  src="../assets/image1.jpeg"
                  alt="bookings"
                />
              </div>
              <div className="booking-information col-lg-9 col-md-9">
                <h6 className="hotel-name">
                  Sea view cottages & complementry meals included
                </h6>
                <div className="stay-information">
                  <span className="info">
                    <span className="material-symbols-outlined icon">
                      bedtime
                    </span>
                    7 nights
                  </span>
                  <span className="info">
                    <span className="material-symbols-outlined icon">
                      calendar_month
                    </span>
                    2024-01-22
                  </span>
                  <span class="material-symbols-outlined icon">
                    arrow_forward
                  </span>
                  <span className="info">
                    <span className="material-symbols-outlined icon">
                      calendar_month
                    </span>
                    2024-01-24
                  </span>
                </div>
                <h5 className="booking-price">
                  <span class="material-symbols-outlined">payments</span> Total
                  Price :&#8377; 13999
                </h5>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MyBookings;
