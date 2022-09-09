import AdminContext from "./AdminContext";
import { useState } from "react";

const AdminState = (props) => {
  const initial=[]
  const [users, setUsers] = useState(initial);
  const [notes, setNotes] = useState(initial);
  const URL="https://icloudnotebook.herokuapp.com"

  async function fetchAllUser() {
    try{
    const response = await fetch(URL+"/api/auth/fetchalluser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUsers(data.users);
    }catch(e){
      
  }
  }

  async function fetchAllNotes() {
    try{
    const response = await fetch(URL+"/api/note/fetchallnote",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setNotes(data.notes);
    }catch(e){}
  }

  return (
    <AdminContext.Provider value={{ 
        users,
        notes,
        fetchAllUser,
        fetchAllNotes
        }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
