import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNote = [];
  const [notes, setNotes] = useState(initialNote);
  const [error, setError] = useState();

  const URL = "https://icloudnotebook.herokuapp.com/api/note/";

  async function fetchNote(authToken) {
    try{
    const response = await fetch(URL + "fetchnote", {
      method: "GET",
      headers: {
        "auth-token": authToken,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setNotes(data.note);
    if(data.message==="error"){
      return setError(data.error)
    }
    console.clear();
  }catch(e){}
  }

  const createNote = async (title, description, tag, authToken) => {
    try{
    const response = await fetch(URL + "createnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const data = await response.json();
    if(data.message==="error"){
      return setError(data.error)
    }
    setNotes(notes.concat(data.note));
  }catch(e){}
  };

  const updateNote = async (noteId, title, description, tag, authToken) => {
    try{
    const response = await fetch(URL + "updatenote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        noteId,
        title,
        description,
        tag,
      }),
    });
    const data = await response.json();
    if(data.message==="error"){
      return setError(data.error)
    }
    const newNotes = notes;

    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === noteId) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    fetchNote(authToken);
  }catch(e){}
  };

  const deleteNote = async (noteId, authToken) => {
    try{
    const response = await fetch(URL + "deletenote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        noteId,
      }),
    });
    const data = await response.json();
    if(data.message==="error"){
      return setError(data.error)
    }
    const newNotes = notes.filter((note) => {
      return note._id !== noteId;
    });
    setNotes(newNotes);
    fetchNote(authToken);
  }catch(e){}
  };

  return (
    <>
      <NoteContext.Provider
        value={{
          notes,
          setNotes,
          createNote,
          fetchNote,
          updateNote,
          deleteNote,
          error
        }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};
export default NoteState;
