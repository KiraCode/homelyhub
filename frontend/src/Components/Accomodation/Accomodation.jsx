import React, { useState } from "react";
import "../../CSS/Accomodation.css";
import ProgressSteps from "../ProgressSteps";

import AccomodationForm from "./AccomodationForm";
import MyAccomodation from "./MyAccomdation";
import { useNavigate } from "react-router-dom";

const Accomodation = () => {
  const navigate = useNavigate();
  const [isShowForm, setShowForm] = useState(false);
  const [isShowbutton, setShowbutton] = useState(true);

  const showForm = () => {
    setShowbutton(false);
    setShowForm(true);
  };

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        {isShowbutton && (
          <button className="add-new-place" onClick={showForm}>
            + Add new place
          </button>
        )}
        {isShowbutton && <MyAccomodation />}
        {isShowForm && <AccomodationForm />}
      </div>
    </>
  );
};

export default Accomodation;
