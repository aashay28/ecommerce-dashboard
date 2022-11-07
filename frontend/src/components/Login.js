import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectData = async () => {
    let result = await fetch("http://localhost:8000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className='signup'>
      <h2>Login</h2>

      <input
        className='inputbox'
        type='text'
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'
        value={email}
      />
      <input
        className='inputbox'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter Password'
        value={password}
      />
      <button type='button' onClick={collectData}>
        Login
      </button>
    </div>
  );
};

export default Login;
