import React, { useState } from "react";
import "../../CSS/ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);
  };

  return (
    <>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form onSubmit={submitHandler}>
            <h1 className='password_title'>Forget Password</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Enter Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id='forgot_password_button'
              type='submit'
              className='btn-block py-3 password-btn'
              //   disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
