import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import "react-datepicker/dist/react-datepicker.css";

const Search = () => {
  const { RangePicker } = DatePicker;

  // const [checkinDate, setCheckinDate] = useState(null);
  // const [checkoutDate, setCheckoutDate] = useState(null);

  return (
    <>
      <div className='searchbar'>
        <input
          className='search'
          id='search_destination'
          placeholder='Search destinations'
          type='text'
        />
        <Space direction='vertical' size={12} className='search'>
          <RangePicker
            format='DD-MM-YYYY'
            picker='date'
            className='date_picker'
          />
        </Space>
        <input className='search' id='addguest' placeholder='Add guests' />
        <span class='material-symbols-outlined searchicon'>search</span>
      </div>
    </>
  );
};

export default Search;
