import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");

  return (
    <div>
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
          {auth ? (
            <Link to='/logout'>Logout</Link>
          ) : (
            <Link to='/signup'>Signup</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
