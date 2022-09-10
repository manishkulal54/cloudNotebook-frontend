import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Stylesheet/Signup.css";
import img from "../images/signup.png";

export default function Signup() {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [signupText,setSignupText]=useState("Signup")

  // img parallax code
  function signupParallax(e) {
    let regImg = document.querySelectorAll(".reg-img");
    regImg.forEach((elem) => {
      let data = elem.getAttribute("data-value");
      elem.style.transform = `translateX(${
        (e.clientX * data) / 250
      }px) translateY(${(e.clientY * data) / 250}px)`;
    });
  }

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // validating the signup
  function signupValidator() {
    const { name, phone, email, password, cPassword } = details;

    if (!name || !phone || !email || !password || !cPassword) {
      setMessageFn("fill all the data");
      return false;
    }
    if (!email.includes(".") || !email.includes("@")) {
      setMessageFn("Enter a valid email");
      return false;
    }
    if (password.length + 1 <= 6) {
      setMessageFn("password length must be 6 character");
      return false;
    }
    if (password !== cPassword) {
      setMessageFn("Password is not matching...");
      return false;
    }
    if (phone.length !== 10) {
      setMessageFn("invalid phone number");
      return false;
    }
    const isAllNumbers = /^\d+$/.test(phone);
    if (!isAllNumbers) {
      setMessageFn("invalid Phone Number");
      return false;
    }
    return true;
  }

  // notication message
  function setMessageFn(msg) {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // on submit btn click
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, password } = details;
    const intPhone = Number(phone);

    let validator = signupValidator();
    if (!validator) {
      return;
    }
    setSignupText('Registering....')
    const URL = "https://icloudnotebook.herokuapp.com";
    try {
      const response = await fetch(URL + "/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: intPhone,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.message === "error") {
        setMessageFn(data.error);
      } else {
        toast.success("Rigistration sucessfull", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        sessionStorage.removeItem("authToken");
        sessionStorage.setItem("authToken", data.token);
        setSignupText("Signup")
        window.location.href = "/";
      }
    } catch (e) {
      toast.error("Some error occured While registering", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }
  };

  // eyeBtn control
  const [eyeBtn1, setEyeBtn1] = useState(true);
  const [eyeBtn2, setEyeBtn2] = useState(true);
  function eyeBtnToggle(id) {
    if (id === 1) {
      if (eyeBtn1 === false) {
        setEyeBtn1(true);
      } else {
        setEyeBtn1(false);
      }
    }
    if (id === 2) {
      if (eyeBtn2 === false) {
        setEyeBtn2(true);
      } else {
        setEyeBtn2(false);
      }
    }
  }

  return (
    <div className="signupContainer">
      <div className="signup">
        <div className="sign-form ">
          <p className="signup-text">Signup</p>
          <div>
            <label htmlFor="regName">Name</label>
            <input
              type="text"
              name="name"
              id="regName"
              autoComplete="off"
              onChange={handleChange}
              value={details.name}
            />
          </div>
          <div>
            <label htmlFor="regPhone">Phone</label>
            <input
              type="text"
              name="phone"
              id="regPhone"
              autoComplete="off"
              onChange={handleChange}
              value={details.phone}
            />
          </div>
          <div>
            <label htmlFor="regEmail">Email</label>
            <input
              type="email"
              name="email"
              id="regEmail"
              autoComplete="off"
              onChange={handleChange}
              value={details.email}
            />
          </div>
          <div className="test" >
            <label htmlFor="regPass">Password</label>
            <input
              type={`${eyeBtn1 === true ? "password" : "text"}`}
              name="password"
              id="regPass"
              autoComplete="off"
              onChange={handleChange}
              value={details.password}
            />
            <i
              className={`me-3  btn border-0 eyeBtnMobile ${
                eyeBtn1 === false
                  ? "fa-regular fa-eye"
                  : "fa-sharp fa-solid fa-eye-slash"
              }`}
              style={{ color: "grey" }}
              onClick={() => {
                eyeBtnToggle(1);
              }}
            ></i>
          </div>
          <div>
            <label htmlFor="regCPass">ConfirmPassword</label>
            <input
              type={`${eyeBtn2 === true ? "password" : "text"}`}
              name="cPassword"
              id="regCPass"
              autoComplete="off"
              onChange={handleChange}
              value={details.cPassword}
            />
            <i
              className={`me-3  btn border-0 eyeBtnMobile ${
                eyeBtn2 === false
                  ? "fa-regular fa-eye"
                  : "fa-sharp fa-solid fa-eye-slash"
              }`}
              style={{ color: "grey" }}
              onClick={() => {
                eyeBtnToggle(2);
              }}
            ></i>
          </div>
          <button onClick={handleSubmit}>{signupText}</button>
          <div className="log-text">
            I'am already a User ,<Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <div className="signup-img" id="signupImg" onMouseMove={signupParallax}>
        <img src={img} alt="" className="reg-img" data-value="8" />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
