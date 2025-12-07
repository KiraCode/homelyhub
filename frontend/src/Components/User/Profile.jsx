import React, { Fragment } from "react";
import ProgressSteps from "../ProgressSteps";
import { Link } from "react-router-dom";
import "../../CSS/Profile.css";
const Profile = () => {
  return (
    <>
      <ProgressSteps profile />

      <div className="row justify-content-around mt-5 ">
        <div className="col-6 col-md-6 profile">
          <div className="avatars">
            <figure className="avatar-profile text-center mr-2">
              <img
                className="rounded-circle figure-img img-fluid"
                src="../../../public/assets/avatar.png"
                alt="avatar"
              />
            </figure>
            <h3>Welcome user!</h3>
          </div>
          <div className="userinfo">
            <h4>Full Name</h4>
            <p>User Name</p>

            <h4>Email Address</h4>
            <p>User Email Address</p>

            <h4>Joined On</h4>
            <p>2024-01-15</p>

            <div className="buttons">
              <Link
                to="/editprofile"
                id="edit_profile"
                className="btn btn-block my-5"
              >
                Edit Profile
              </Link>
              <Link to="#" className="btn btn-block my-5 mx-4">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
