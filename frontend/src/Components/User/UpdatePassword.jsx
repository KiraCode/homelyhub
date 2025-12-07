import React, { useState } from "react";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    formData.set("passwordConfirm", passwordConfirm);
  };

  return (
    <>
      {/* <MetaData title={"Change Password"} /> */}

      <div className='row wrapper'>
        <div className='col-10 col-lg-5 updateprofile'>
          <form onSubmit={submitHandler}>
            <h1 className='password_title'>Update Password</h1>
            <div className='form-group'>
              <label for='old_password_field'>Old Password</label>
              <input
                type='password'
                id='old_password_field'
                className='form-control'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label for='new_password_field'>New Password</label>
              <input
                type='password'
                id='new_password_field'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label for='new_password_confirm_field'>
                New Password Confirm
              </label>
              <input
                type='password'
                id='new_password_confirm_field'
                className='form-control'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='btn-block py-3 password-btn'
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
