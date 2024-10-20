import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="signup-page">
      <div className="signup-page__left-content">
        <h1>GoFinance</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button>Read More</button>
      </div>

      <div className="signup-page__right-content">
        <form>
          <h1>Hello!</h1>
          <p>Sign Up to Get Started </p>
          <input
            type="text"
            name="full-name-signup"
            id="full-name-signup"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email-signup"
            id="email-signup"
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password-signup"
            id="password-signup"
            placeholder="Password"
          />
          <button id="register">Register</button>
        </form>
        <div className="signup-page__btn-signin">
          <button id="forgot-password" onClick={() => navigate("/")}>
            Already have account? sign in here!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
