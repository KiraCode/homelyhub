import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getAllPropertys } from "../../Store/Property/property-action";
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
  // const propertys = useSelector((state) => state.propertys);
  // console.log(propertys);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllPropertys());
  // }, [dispatch]);

  const cardsData = [
    {
      id: 1,
      image: "/assets/image1.jpeg",
      name: "Delightful farm cottage - Mysore",
      address: "Mysuru, Karnataka, India",
      price: 1999,
    },
    {
      id: 2,
      image: "/assets/property2.webp",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },

    {
      id: 3,
      image: "/assets/property3.webp",
      name: "Delightful farm cottage - Mysore",
      address: "chennai, Tamil nadu, India",
      price: 2999,
    },
    {
      id: 4,
      image: "/assets/property4.webp",
      name: "Delightful farm cottage - Mysore",
      address: "cochin, Kerala, India",
      price: 2999,
    },
    {
      id: 5,
      image: "/assets/property5.webp",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },
    {
      id: 6,
      image: "/assets/property6.webp",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },
    {
      id: 7,
      image: "/assets/property7.webp",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },
    {
      id: 8,
      image: "/assets/image1.jpeg",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },
    {
      id: 9,
      image: "/assets/image1.jpeg",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },
    {
      id: 10,
      image: "/assets/image1.jpeg",
      name: "Delightful farm cottage - Mysore",
      address: "Manali, Himachal Pradesh, India",
      price: 2999,
    },
  ];

  return (
    <div className="propertylist">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          image={card.image}
          name={card.name}
          address={card.address}
          price={card.price}
        />
      ))}
    </div>
  );
};

export default PropertyList;
