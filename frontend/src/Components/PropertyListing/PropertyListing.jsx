import React, { useEffect } from "react";
import "../../CSS/PropertyListing.css";
import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertMapInfo from "./PropertMapInfo";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getPropertyList } from "../../Store/PropertyListing/propertylist-action";

const PropertyListing = () => {
  // const dispatch = useDispatch();
  // // const propertylist = useSelector((state) => state.propertylist);
  // // console.log(propertylist);
  // // const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getPropertyList("65ae3ee075ff5406488e7e7d"));
  // }, [dispatch]);

  return (
    <div className="property-container">
      <p className="property-header">
        Cider Chalet-F: 2BRK MountainView Apartment
      </p>
      <h6 className="property-location">
        <span class="material-symbols-outlined">house</span>
        <span className="location">Manali, Himachal Pradesh, India</span>
      </h6>
      <PropertyImg />
      <div className="middle-container row">
        <div className="des-and-amenities col-md-8 col-sm-12 col-12">
          <h2 className="property-description-header">Description</h2>
          <p className="property-description">
            Ménage - By The Beas , A colonial style hill cottage near Manali,
            this delightful vacation home promises the perfect mix of hills with
            a scenic river side in the privacy of your own space. <br></br>
            <br></br>Max number of guests: 4
          </p>
          <hr></hr>
          <PropertyAmenities />
        </div>
        <div className="property-payment col-md-4 col-sm-12 col-12">
          <PaymentForm />
        </div>
      </div>
      <hr></hr>
      <div className="property-map">
        <div className="map-image-exinfo-container row">
          <PropertMapInfo />
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
