import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../../store/useUsers";
const LoginPage = () => {
  const navigate = useNavigate();
  const [dataUsers, setDataUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Calls Data from State Management
  const { usersData, fetchData } = useUser((state) => state);
  useEffect(() => {
    fetchData();
    setDataUsers(usersData);
  }, []);
  console.log(dataUsers);
  
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const user = dataUsers.find((user) => {
      return user.email === email && user.password === password;
    });

    if (user) {
      localStorage.setItem("token", user.auth_token);
      navigate("/dashboard");
    } else {
      alert("invalid user or email");
    }

    // set timeout token after 1hour
    // setTimeout(() => {
    //   localStorage.removeItem("token");
    // }, 36000);
  };
  return (
    <div className="login-page">
      <div className="login-page__left-content">
        <h1>GoFinance</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <button>Read More</button>
      </div>

      <div className="login-page__right-content">
        <form onSubmit={handleSubmitLogin}>
          <h1>Hello Again!</h1>
          <p>Welcome Back</p>
          <input
            type="email"
            name="email-login"
            id="email-login"
            placeholder="Email Address"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="passwordLogin"
            id="password-login"
            placeholder="Password"
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
          />
          <button id="login">Login</button>
        </form>
        <div className="login-page__btn-group">
          <button id="forgot-password">Forgot Password</button>
          <button id="sign-up" onClick={() => navigate("/sign-up")}>
            Sign Up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
