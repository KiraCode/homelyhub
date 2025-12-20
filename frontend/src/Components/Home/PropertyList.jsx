import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { propertyAction } from "../../store/Property/property-slice.js";
import { getAllProperties } from "../../store/Property/property-action.js";
// import "../../CSS/Home.css";

const Card = ({ image, name, address, price }) => {
  return (
    <figure className="property">
      <Link to="/propertylist">
        <img src={image} alt="Propertyimg" />
      </Link>
      <h4>{name}</h4>
      <figcaption>
        <main className="propertydetails">
          <h5>{name}</h5>

          <h6>
            <span class="material-symbols-outlined houseicon">home_pin</span>
            {address}
          </h6>
          <p>
            <span className="price"> ₹{price}</span> per night
          </p>
        </main>
      </figcaption>
    </figure>
  );
};

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const dispatch = useDispatch();
  const { properties, totalProperties } = useSelector(
    (state) => state.properties
  );

  const lastPage = Math.ceil(totalProperties / 12);

  useEffect(() => {
    const fetchProperties = async (page) => {
      dispatch(propertyAction.updateSearchParams(page));
      dispatch(getAllProperties());
    };
    fetchProperties(currentPage);
  }, [currentPage, dispatch]);
  return (
    <>
      {properties.kength === 0 ? (
        <p className="not_found">Property Not Found</p>
      ) : (
        <div className="propertylist">
          {properties.map((property) => (
            <Card
              key={property.id}
              image={property.images[0].url}
              name={property.propertyName}
              address={`${property.address.city}, ${property.address.state}, ${property.address.pincode}`}
              price={property.price}
            />
          ))}
        </div>
      )}
      <div className="pagination">
        <button
          className="previous_btn"
          onClick={() => setCurrentPage((prev) => ({ page: prev.page - 1 }))}
          disabled={currentPage.page === 1}
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <button
          className="next_btn"
          onClick={() => setCurrentPage((prev) => ({ page: prev.page + 1 }))}
          disabled={properties.length < 12 || currentPage.page === lastPage}
        >
          <span className="material-symbols-outlined">
            arrow_forward_ios
          </span>
        </button>
      </div>
    </>
  );
};

export default PropertyList;
