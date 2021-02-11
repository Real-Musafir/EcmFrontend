import React from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../carts/Cart";

const Headers = () => {
  let u_id = "";
  const st = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : null;
  if (st) {
    const jwt = require("jsonwebtoken");
    const token1 = st;
    const decode1 = jwt.decode(token1);
    u_id = decode1.user_id;
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      style={{ backgroundColor: "#000" }}
    >
      <Link
        to="/"
        style={{ color: "#00FFFF", fontSize: "40px", marginRight: "10px" }}
      >
        ECM
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="btnn" exact to="">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <div>
            <li className="nav-item">
              <button
                type="button"
                className="btnn"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Login
              </button>
            </li>
            <Login />
          </div>
          {!u_id && (
            <div>
              <li className="nav-item">
                <button
                  type="button"
                  className="btnn"
                  data-toggle="modal"
                  data-target="#exampleModalCenterr"
                >
                  Register
                </button>
              </li>
              <Register />
            </div>
          )}
          {u_id && (
            <li className="nav-item">
              <NavLink className="btnn" exact to="/logout">
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Headers;
