// Filter.js
import React, { useState } from "react";
import FilterModal from "./FilterModal";

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null,
    amenities: [],
    entireRoom: false,
    propertyType: null,
  });

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <>
      <span
        className='material-symbols-outlined filter'
        onClick={handleShowAllPhotos}>
        tune
      </span>
      {isModalOpen && (
        <FilterModal
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Filter;
