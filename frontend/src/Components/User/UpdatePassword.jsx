import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../store/Users/user-action.js";
import { userActions } from "../../store/Users/user-slice.js";
import { useNavigate } from "react-router-dom";
import "../../CSS/ForgetPassword.css";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { errors, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Password doesn't match");
      return false;
    } else {
      console.log(password, passwordCurrent, passwordConfirm);
      dispatch(updatePassword({ passwordCurrent, password, passwordConfirm }));
    }
  };

  useEffect(() => {
    if (errors) {
      toast.error(errors);
      dispatch(userActions.clearError());
    } else if (success) {
      toast.success("Password updated successfully");
      navigate("/profile");
      dispatch(userActions.getPasswordSuccess(false));
    }
  }, [errors, dispatch, navigate, success]);

  return (
    <>
      {/* <MetaData title={"Change Password"} /> */}

      <div className="row wrapper">
        <div className="col-10 col-lg-5 updateprofile">
          <form onSubmit={submitHandler}>
            <h1 className="password_title">Update Password</h1>
            <div className="form-group">
              <label for="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="new_password_confirm_field">
                New Password Confirm
              </label>
              <input
                type="password"
                id="new_password_confirm_field"
                className="form-control"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-block py-3 password-btn"
              //   disabled={loading ? true : flse}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
