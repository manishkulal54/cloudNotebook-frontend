import React, { useContext, useState } from "react";
import noteContext from "../context/NoteContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import '../Stylesheet/Overall.css'

export default function CreateNote(props) {
  // eslint-disable-next-lin
  const noteState = useContext(noteContext);
  const { createNote } = noteState;

  const [notes, setNotes] = useState({ title: "", description: "", tag: "" });

  function handleSubmit() {
    if (notes.title.length === 0) {
      return toast.error("Give a title for the note", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
      setNotes({ title: " ", description: " ", tag: "" });
      toast.success("note created successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    createNote(notes.title, notes.description, notes.tag, props.authToken);
  }

  function handleChange(e) {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  }
  return (
    <div className="container createCont">
      <h2 className="text-center"> Create a note</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control createInput"
          id="exampleFormControlInput1"
          name="title"
          autoComplete="false"
          onChange={handleChange}
          value={notes.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control createInput"
          id="exampleFormControlTextarea1"
          name="description"
          rows="3"
          autoComplete="off"
          onChange={handleChange}
          value={notes.description}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control createInput"
          id="exampleFormControlInput2"
          name="tag"
          autoComplete="off"
          onChange={handleChange}
          value={notes.tag}
        />
      </div>
      <div className="container text-center">
        <button
          type="button"
          className="createBtn"
          onClick={handleSubmit}
        >
          Add Note
        </button>
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
