// import React from 'react'
import("../style.css");
// import("/Navbar.css")
import { useState, useEffect } from "react";
import Logo from "../assets/images/new1.png";
function Homenav() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    window.location = "./login";
  };
  const [status, setStatus] = useState("Login");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setStatus("Login");
    } else {
      setStatus("LogOut");
    }
  }, [setStatus]);
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/">Home</a>
            </li>
            {/* <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li> */}
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/OrderUsers">OrderUsers</a>
            </li>
            <li>
              <a href="/OrderManage">OrderManage</a>
            </li>
            <li>
              <a href="/ProductManage">ProductManage</a>
            </li>
          </ul>
        </div>
        <a href="/">
          <img src={Logo} alt="Logo" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li> */}
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/OrderUsers">OrderUsers</a>
          </li>
          <li>
            <a href="/OrderManage">OrderManage</a>
          </li>
          <li>
            <a href="/ProductManage">ProductManage</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn" href="/login" onClick={handleLogout}>
          {status}
        </a>
      </div>
    </div>
  );
}
export default Homenav;
