import React, { useContext} from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


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
                toast.success('Note edited', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                editNote(note)
              }
            }
          ></i>
          <i
            className="fa-solid fa-trash-can btn border-0"
            onClick={() => {
               toast.success('Note deleted', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              deleteNote(note._id, authToken);
            }}
          ></i>
        </div>
        <h5 className="title text-center" style={{textDecoration:'underline'}}>{note.title}</h5>
        <p className="description text-center">{note.description}</p>
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
    </>
  );
}
