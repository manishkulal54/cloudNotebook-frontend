import React, { useContext} from "react";
import {toast } from "react-toastify";


import noteContext from "../context/NoteContext";
import "../Stylesheet/Note.css";

export default function Note(props) {
  const noteState = useContext(noteContext);
  const { deleteNote } = noteState;

  const {authToken,note,editNote}=props

  return (
    <>
      <div className="mt-3 p-3 noteBox">
        <div className="icons">
          <i
            className="fa-solid fa-pen-to-square btn border-0"
            onClick={
              ()=>{
                editNote(note)
              }
            }
          ></i>
          <i
            className="fa-solid fa-trash-can btn border-0"
            onClick={() => {
              deleteNote(note._id, authToken);
               toast.success('Note deleted', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            }}
          ></i>
        </div>
        <h5 className="title text-center" style={{textDecoration:'underline'}}>{note.title}</h5>
        <p className="description text-center">{note.description}</p>
      </div>
    </>
  );
}
