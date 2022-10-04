import React, { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import noteContext from "../context/NoteContext";
import CreateNote from "./CreateNote";
import "../Stylesheet/Overall.css";
import Navbar from "./Navbar";
import Note from "./Note";

export default function Home() {
  const authToken = getToken();
  const editBtn = useRef();
  const closeBtn = useRef();

  useEffect(() => {
    fetchNote(authToken);
    // eslint-disable-next-line
  }, []);

  function getToken() {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/signup";
      return null;
    } else {
      return token;
    }
  }

  const noteState = useContext(noteContext);
  const { notes, fetchNote, updateNote } = noteState;

  const [eNote, setENote] = useState({
    eId: "",
    eTitle: "",
    eDescription: "",
    eTag: "",
  });

  const HandleEChange = (e) => {
    setENote({ ...eNote, [e.target.name]: e.target.value });
  };

  const editNote = (currentNote) => {
    editBtn.current.click();
    setENote({
      eId: currentNote._id,
      eTitle: currentNote.title,
      eDescription: currentNote.description,
      eTag: currentNote.tag,
    });
  };

  function handleEdit() {
    updateNote(
      eNote.eId,
      eNote.eTitle,
      eNote.eDescription,
      eNote.eTag,
      authToken
    );
    toast.success("Note edited", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    closeBtn.current.click();
  }

  return (
    <>
      <Navbar />
      <CreateNote authToken={authToken} />
      <h3 className=" mt-5 text-center HomeNoteTxt">
        {notes.length !== 0 && "Your Notes"}
      </h3>
      <div className="container d-flex mt-5 mb-5 flex-wrap align-items-center">
        <h4 className="text-center w-100">
          {notes.length === 0 && "Currently You have not created any note"}
        </h4>
        {notes.map((note) => {
          return (
            <Note
              authToken={authToken}
              key={note._id}
              note={note}
              editNote={editNote}
              // key is not prop it is for uniqueness
            />
          );
        })}
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

      {/* *******************editing the notess  ********************/}
      {/* ******************* editing the notess  ********************/}
      {/* ******************* editing the notess ******************* */}

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        ref={editBtn}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        open the edit box
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="eTitle"
                  value={eNote.eTitle}
                  autoComplete="off"
                  onChange={HandleEChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="eDescription"
                  autoComplete="off"
                  value={eNote.eDescription}
                  onChange={HandleEChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1Lable"
                  className="form-label"
                >
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1Lable"
                  name="eTag"
                  autoComplete="off"
                  value={eNote.eTag}
                  onChange={HandleEChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeBtn}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
