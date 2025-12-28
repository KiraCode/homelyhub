import React from "react";
import ImagesUploading from "./ImagesUploading";
import { useForm } from "@tanstack/react-form";
import AddressField from "./AddressField";
import AmenitiesField from "./AmenitiesField";

const AccomodationForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      propertyType: undefined,
      roomType: undefined,
      extraInfo: undefined,
      images: [],
      amenities: [],
      address: {},
      checkIn: undefined,
      checkOut: undefined,
      maximumGuest: 0,
      price: "",
    },
    onSubmit: async ({ value }) => {
      try {
      } catch (error) {}
    },
  });
  return (
    <div className="accom-form-container">
      <form
        className="accom-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h4 className="title-header">Title</h4>
        <form.Field name="name">
          {(field) => (
            <div className="title-container input-container">
              <label className="form-labels">
                Title for your place.should be short and catchy as in
                advertisment
              </label>
              <br></br>
              <input
                className="title"
                type="text"
                placeholder="Title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </div>
          )}
        </form.Field>
        <AddressField form={form} />
        <form.Field name="images">
          {(field) => <ImagesUploading field={field} />}
        </form.Field>
        <div className="description-container input-container">
          <h4 className="description-header">Description</h4>
          <form.Field>
            {(field) => (
              <>
                {" "}
                <label className="form-labels">
                  Describe your place to attract people
                </label>
                <br></br>
                <textarea
                  className="description"
                  rows="3"
                  placeholder="Description"
                ></textarea>
              </>
            )}
          </form.Field>
        </div>

        <div className="property-room-container">
          <div className="property-type">
            <h4 className="property-type-header">Property Type</h4>
            <form.Field name="propertyType">
              {(field) => {
                <select
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="" disabled>
                    Select Property Type
                  </option>
                  <option value="House">House</option>
                  <option value="Flat">Flat</option>
                  <option value="Guest House">Guest House</option>
                  <option value="Hotel">Hotel</option>
                </select>;
              }}
            </form.Field>
          </div>

          <div className="room-type">
            <h4 className="room-type-header">Room Type</h4>
            <form.Field name="roomType">
              {(field) => {
                <select
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="" disabled>
                    Select Room Type
                  </option>
                  <option value="AnyType">AnyType</option>
                  <option value="Entire Home">Entire Home</option>
                  <option value="Room">Room</option>
                </select>;
              }}
            </form.Field>
          </div>
        </div>

        <AmenitiesField form={form} />
        <form.Field name="extraInfo">
          {(field) => (
            <div className="info-container input-container">
              <h4 className="info-header">Extra Info</h4>
              <label className="form-labels">House rules and more</label>
              <br></br>
              <textarea
                className="info"
                rows="3"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              ></textarea>
            </div>
          )}
        </form.Field>
        <div className="timein-timeout-maxguest">
          <h4 className="timein-maxguest-header">
            Check in, Check out times and max guests
          </h4>
          <p className="form-paras">
            Add check-in and check-out times (24 Hour Format)
          </p>
          <div className="container-time-maxguest row">
            <form.Field name="checkIn">
              {(field) => (
                <section className="checkin-time col-sm-12 col-md-4 col-lg-3">
                  <label>Check In Time</label>
                  <input
                    type="time"
                    placeholder="10:10"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </section>
              )}
            </form.Field>
            <form.Field name="checkOut">
              {(field) => (
                <section className="checkout-time col-sm-12 col-md-4 col-lg-3">
                  <label>Check Out Time</label>
                  <input
                    type="time"
                    placeholder="20:20"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </section>
              )}
            </form.Field>
            <form.Field name="maximumGuest">
              {(field) => (
                <section className="max-guest col-sm-12 col-md-4 col-lg-3">
                  <label>Max Guests</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </section>
              )}
            </form.Field>
            <form.Field name="price">
              {(field) => (
                <section className="price-per-night col-sm-12 col-md-4 col-lg-3">
                  <label>Price Per Night (Rs)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </section>
              )}
            </form.Field>
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
