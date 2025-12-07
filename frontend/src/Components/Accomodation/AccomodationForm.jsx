import React from "react";
import ImagesUploading from "./ImagesUploading";

const AccomodationForm = () => {
  return (
    <div className="accom-form-container">
      <form className="accom-form">
        <h4 className="title-header">Title</h4>
        <div className="title-container input-container">
          <label className="form-labels">
            Title for your place.should be short and catchy as in advertisment
          </label>
          <br></br>
          <input className="title" type="text" placeholder="Title"></input>
        </div>
        <div className="address-container ">
          <h4 className="address-header">Address</h4>
          <label className="form-labels">Address to your place</label>
          <br></br>
          <div className="address-fields">
            <input className="area" type="text" placeholder="Area" required />
            <input className="city" type="text" placeholder="City" required />
            <input className="state" type="text" placeholder="State" required />
            <input
              className="pincode"
              type="number"
              placeholder="Pincode"
              required
            />
          </div>
        </div>
        <ImagesUploading />
        <div className="description-container input-container">
          <h4 className="description-header">Description</h4>
          <label className="form-labels">
            Describe your place to attract people
          </label>
          <br></br>
          <textarea
            className="description"
            rows="3"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="perks-container ">
          <h4 className="perks-header">Title</h4>
          <p className="form-paras">Select perks</p>
          <div className="perks row ">
            <div className="wifi-box checkbox-container col-sm-12 col-md-3 col-lg-2">
              <input type="checkbox" />
              <span className="material-symbols-outlined">wifi </span>
              <span>Wifi</span>
            </div>
            <div className="pet-box checkbox-container col-sm-12 col-md-3 col-lg-2">
              <input type="checkbox" />
              <span class="material-symbols-outlined">sentiment_satisfied</span>
              <span>Pet-friendly</span>
            </div>

            <div className="parking-box checkbox-container col-sm-12 col-md-3 col-lg-2">
              <input type="checkbox" />
              <span className="material-symbols-outlined">garage_home</span>
              <span>Free parking spot</span>
            </div>
            <div className="private-box checkbox-container col-sm-12 col-md-3 col-lg-2">
              <input type="checkbox" />
              <span className="material-symbols-outlined">login</span>
              <span>Private enterence</span>
            </div>
            <div className="tv-box checkbox-container col-sm-12 col-md-3 col-lg-2">
              <input type="checkbox" />
              <span className="material-symbols-outlined">tv</span>
              <span>Tv</span>
            </div>
          </div>
        </div>
        <div className="info-container input-container">
          <h4 className="info-header">Extra Info</h4>
          <label className="form-labels">House rules and more</label>
          <br></br>
          <textarea className="info" rows="3"></textarea>
        </div>
        <div className="timein-timeout-maxguest">
          <h4 className="timein-maxguest-header">
            Check in, Check out times and max guests
          </h4>
          <p className="form-paras">
            Add check-in and check-out times (24 Hour Format)
          </p>
          <div className="container-time-maxguest row">
            <section className="checkin-time col-sm-12 col-md-4 col-lg-3">
              <label>Check In Time</label>

              <input type="time" placeholder="10:10" />
            </section>
            <section className="checkout-time col-sm-12 col-md-4 col-lg-3">
              <label>Check Out Time</label>

              <input type="time" placeholder="20:20" />
            </section>
            <section className="max-guest col-sm-12 col-md-4 col-lg-3">
              <label>Max Guests</label>
              <input type="number" placeholder="1" />
            </section>
            <section className="price-per-night col-sm-12 col-md-4 col-lg-3">
              <label>Price Per Night (Rs)</label>
              <input type="number" placeholder="100" />
            </section>
          </div>
        </div>
        <button className="save" type="Submit ">
          Save
        </button>
      </form>
    </div>
  );
};

export default AccomodationForm;
