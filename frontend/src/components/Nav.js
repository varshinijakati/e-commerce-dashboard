import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const user = auth ? JSON.parse(auth) : null;

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    
    <div className="navbar">
    <div >
        <img src="https://imgs.search.brave.com/P8BB2wrjAPeu431TfM1V0GSTmiYRROJxSRJO60JxMmY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3Nob3BwaW5n/LWJhZy1wbmctc2hv/cHBpbmctYmFnLWlj/b24tMjU2LnBuZw" alt="logo" className="logo"/>
        <ul className="nav-ul title">
          <li>
            <Link to="/">CATAY'S</Link>
          </li>
        </ul>
      </div>  
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </li>
          <li>
              <Link onClick={logout} to="/signup">
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
    
  );
};

export default Nav;
