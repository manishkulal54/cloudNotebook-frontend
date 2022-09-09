import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./AuthPages/Login";
import Signup from "./AuthPages/Signup";
import Offline from "./pages/Offline";
import NoteState from "./context/NoteState";

import AdminLog from "./Admin/AdminLog";

export default function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/admin" element={<AdminLog username={"M@nish"} password={"M@ni$4"}/>} />
          <Route exact path="*" element={<Offline/>} />
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}
