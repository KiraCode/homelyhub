import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import "../../CSS/Login.css";

const Signup = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const { name, email, password, passwordConfirm, phoneNumber } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password !== passwordConfirm) {
      alert.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("passwordConfirm", passwordConfirm);
    formData.set("phoneNumber", phoneNumber);
    formData.set("avatar", avatar);

    console.log(formData);
  };
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <div className="row wrapper ">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="col-10 col-lg-5"
        >
          <h1 className="mb-3">Register</h1>
          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm_field">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm_field"
              className="form-control"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber_field">Phone Number</label>
            <input
              type="text"
              id="phoneNumber_field"
              className="form-control"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            className="loginbutton btn-block py-3"
          >
            REGISTER
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
