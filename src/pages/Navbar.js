import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  function logOut() {
    sessionStorage.removeItem("authToken");
    window.location.href = "/";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg d-flex">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://manishkulal.netlify.app/">
            Manish
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" >
                <Link className="nav-link active" aria-current="page" to="/" >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-item">
                  <button
                    className="nav-link"
                    href="/"
                    onClick={logOut}
                    style={{ border: "none",background:"none" }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
