import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectData = async () => {
    let result = await fetch("http://localhost:8000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
      setName("");
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
      <h2>Register</h2>
      <input
        className='inputbox'
        type='text'
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter Name'
        value={name}
      />
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
        Signup
      </button>
    </div>
  );
};

export default Signup;
