import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../store/useUsers";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createNewUser } = useUser((state) => state);
  const handleSubmit = (e) => {
    e.preventDefault();
    const create = async () => {
      await createNewUser(fullName, email, password);
    };
    create();
    window.alert("User successfully created!");
    setFullName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="signup-page">
      <div className="signup-page__left-content">
        <h1>GoFinance</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button>Read More</button>
      </div>

      <div className="signup-page__right-content">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Hello!</h1>
          <p>Sign Up to Get Started </p>
          <input
            type="text"
            name="full-name-signup"
            id="full-name-signup"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            name="email-signup"
            id="email-signup"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password-signup"
            id="password-signup"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
