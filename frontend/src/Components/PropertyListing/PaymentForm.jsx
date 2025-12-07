import React, { useState } from "react";

import { DatePicker, Space } from "antd";

const PaymentForm = () => {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const { RangePicker } = DatePicker;
  const handleDateChange = (value, dateString) => {
    setCheckinDate(dateString[0]);
    setCheckoutDate(dateString[1]);
  };
  return (
    <div className="form-container">
      <form className="payment-form">
        <div className="price-pernight">
          Price: <b>&#8377;2400</b>
          <span> / Per night</span>
        </div>
        <div className="payment-field">
          <div className="date">
            <Space direction="vertical" size={12}>
              <RangePicker
                format="DD-MM-YYYY"
                picker="date"
                onChange={handleDateChange}
              />
            </Space>
          </div>
          <div className="guest">
            <label className="payment-labels">Number of guests:</label>
            <br></br>
            <input
              type="number"
              className="no-of-guest"
              placeholder="Guest"
            ></input>
          </div>
          <div className="name-phoneno">
            <label className="payment-labels">Your full name:</label> <br></br>
            <input type="text" className="full-name" placeholder="Name"></input>
            <br></br>
            <label className="payment-labels">Phone Number:</label> <br></br>
            <input
              type="number"
              className="phone-number"
              placeholder="Number"
            ></input>
          </div>
        </div>
        <div className="book-place">
          <button>Book this place &#8377; 2400</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
