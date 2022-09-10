import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Stylesheet/Login.css";
import accImg from "../images/account.png";

export default function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [loginText,setLoginText] = useState("Login");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // login validation
  function loginValidator() {
    const { email, password } = details;
    if (!email || !password) {
      toast.warn("Fill all the data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  }

  // handle submit
  const handleSubmit = async (e) => {
    const { email, password } = details;

    let validator = loginValidator();
    if (!validator) {
      return;
    }
    setLoginText("loging in...")

    const URL = "https://icloudnotebook.herokuapp.com";

    try {
      const response = await fetch(URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      setLoginText('Login')
      if (data.message === "error") {
        toast.error("invalid credential", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        sessionStorage.removeItem("authToken");
        sessionStorage.setItem("authToken", data.token);
        toast.success("Logging you in", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.href = "/";
      }
    } catch (e) {}
  };

// to submit on key 'Enter'
  const clickRef = useRef(null);
  window.onkeydown = (e) => {
    if (e.key === "Enter") {
      clickRef.current.click();
    }
  };


  // eyeBtn handling
  const [eyeBtn, setEyeBtn] = useState(true);
  function eyeBtnToggle() {
    if (eyeBtn === false) {
      setEyeBtn(true);
    } else {
      setEyeBtn(false);
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login">
          <div className="log-form">
            <div className="login-data">
              <img src={accImg} alt="" className="accImg" />
              <p>login</p>
            </div>
            <div className="input-div">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                name="email"
                id="loginEmail"
                autoComplete="off"
                onChange={handleChange}
                value={details.email}
              />
            </div>
            <div className="input-div">
              <label htmlFor="loginPass">Password</label>
              <input
                type={`${eyeBtn === true ? "password" : "text"}`}
                id="loginPass"
                name="password"
                autoComplete="off"
                onChange={handleChange}
                value={details.password}
              />
              <i
                className={`me-3  btn border-0 eyeBtnMobileLog ${
                  eyeBtn === false
                    ? "fa-regular fa-eye"
                    : "fa-sharp fa-solid fa-eye-slash"
                }`}
                style={{ color: "grey" }}
                onClick={eyeBtnToggle}
              ></i>
              </div>
            <button onClick={handleSubmit} ref={clickRef}>
              {loginText}
            </button>
            <p className="reg-text">
              Create account <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </>
  );
}
