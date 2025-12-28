import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice.js";
import { getAllProperties } from "../../store/Property/property-action.js";

const Search = () => {
  const { RangePicker } = DatePicker;
  const [keyword, setKeyword] = useState({});
  // city:"", datein:, dateout:, guests:
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();

  function searchHandler(e) {
    e.preventDefault();
    dispatch(propertyAction.updateSearchParams(keyword));
    dispatch(getAllProperties());

    setKeyword({ city: "", dateIn: "", dateOut: "", guests: "" });
    setValue([]);
  }

  const updateKeyword = (field, value) => {
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: value,
    }));
  };

  const returnDates = (date, dateString) => {
    setValue(date[0], date[1]);
    updateKeyword("dateIn", dateString[0]);
    updateKeyword("dateOut", dateString[1]);
  };
  return (
    <>
      <div className="searchbar">
        <input
          className="search"
          id="search_destination"
          placeholder="Search destinations"
          type="text"
          value={keyword.city}
          onChange={(e) => updateKeyword("city", e.target.value)}
        />
        <Space direction="vertical" size={12} className="search">
          <RangePicker
            format="DD-MM-YYYY"
            picker="date"
            className="date_picker"
            value={value}
            disabledDate={(current) =>
              current & current.isBefore(Date.now(), "day")
            }
            onChange={returnDates}
          />
        </Space>
        <input
          className="search"
          id="addguest"
          placeholder="Add guests"
          type="number"
          value={keyword.guests}
          onChange={(e) => updateKeyword("guests", +e.target.value)}
        />
        <span
          className="material-symbols-outlined searchicon"
          onClick={searchHandler}
        >
          search
        </span>
      </div>
    </>
  );
};

export default Search;
