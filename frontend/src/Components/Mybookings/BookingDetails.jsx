import React, { useEffect } from "react";
import "../../CSS/BookingDetails.css";
import PropertyImg from "../PropertyListing/PropertyImg";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSelector } from "react-router-dom";
import { fetchBookingDetails } from "../../store/Booking/bookingAction";
import LoadingSpinner from "../LoadingSpinner";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const { bookingDetails } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingDetails(bookingId));
  }, [dispatch, bookingId]);

  if (!bookingDetails || !bookingDetails.property) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="details-container">
      <p className="details-header">{bookingDetails.property.propertyName}</p>
      <h6 className="details-location">
        <span className="material-symbols-outlined">location_on</span>
        <span className="location">
          {bookingDetails.property.address.area}{" "}
          {bookingDetails.property.address.city}{" "}
          {bookingDetails.property.address.pincode}{" "}
          {bookingDetails.property.address.state}{" "}
        </span>
      </h6>
      <div className="details-information-container ">
        <div className="details-information ">
          <h5 className>Booking Information</h5>
          <section className="booking-stay-information">
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                bedtime
              </span>
              {bookingDetails.numberOfnights} nights
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              {new Date(bookingDetails.fromDate).toLocaleDateString()}
            </span>
            <span class="material-symbols-outlined  stay-icon">
              arrow_forward
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              {new Date(BookingDetails.toDate).toLocaleDateString()}
            </span>
          </section>
        </div>
        <div className="details-total-price-container ">
          <div className="details-total-price">
            <p className="price-header">Total Price</p>
            <span className="price-in-number">
              {" "}
              &#8377; {bookingDetails.price}
            </span>
          </div>
        </div>
      </div>
      <PropertyImg images={bookingDetails.property.images} />
    </div>
  );
};

export default BookingDetails;
