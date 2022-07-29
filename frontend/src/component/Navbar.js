import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  StarOutlined,
  StarFilled,
  StarTwoTone,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import SearchBox from "./SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../services/LocalStorage";
import { unsetUserInfo } from "../features/Auth/AuthSlice";

function Navbar() {
  const [serarchField, setserarchField] = useState("");
  const dispatch = useDispatch();
  const sercchField = (e) => {
    e.preventDefault();
    console.log(serarchField, "serarchField");
  };
  const navigate = useNavigate();
  let profile = useSelector((state) => state.user.name);

  const logoutFunction = () => {
    console.log("Logout Clicked");
    removeToken();
    dispatch(unsetUserInfo({ access_token: null }));
    dispatch(unsetUserInfo({ name: "", email: "" }));
    let profile :  'qasim'
    navigate("/login");
  };
  console.log(profile, "profile");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          ShoppingX
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {profile !== '' ? (
            <>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="electronicsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Electronics
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="electronicsDropdown"
                  >
                    <li>
                      <a className="dropdown-item">Mobile</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Laptop
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="fashionDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Fashion
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="fashionDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Top Wear
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Bottom Wear
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-warning" type="submit">
                  S
                </button>
              </form>
              <ul>
                <li className="nav-item dropdown mx-2">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {profile}{" "}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <Link className="nav-link dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link dropdown-item" to="/oldorder">
                        Order
                      </Link>
                    </li>
                    <li>
                      <a className="nav-link" onClick={logoutFunction}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav   mb-lg-0">
                <li className="nav-item mx-2">
                  <Link className="nav-link active" to="/cart">
                    3
                  </Link>
                </li>
              </ul>
     
            </>
          ) : (
            <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2 nav-link text-white">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2 nav-link text-white">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </>

            //             </li>

            //             <li className="nav-item">
            //
            //             </li>
          )}

          <div></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
