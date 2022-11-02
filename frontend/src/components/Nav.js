import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logoutHandler = () => {
    localStorage.removeItem("user");
    if (!auth) {
      navigate("/login");
    }
  };
  return (
    <div>
      {auth ? (
        <ul className='nav-ul'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/add'>Add products</Link>
          </li>
          <li>
            <Link to='/update'>Update Products</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>

          <li>
            <Link to='/logout' onClick={logoutHandler}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className='nav-ul'>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
