import React, {useContext, useEffect } from "react";
import "../Stylesheet/Admin.css";
import AdminData from "./AdminData";
import AdminContext from "../context/AdminContext";

export default function Panel(props) {
  const adminState = useContext(AdminContext);
  const { fetchAllUser, fetchAllNotes, users, notes } = adminState;

  useEffect(() => {
    fetchAllUser();
    fetchAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${!props.lock ? "d-block" : "d-none"}`}>
      <div className="Pcontainer">
        <div className="PHead">
          <p>Analytics</p>
        </div>
        <div className="Pcircles">
          <div className="PBox">
            <p>Users</p>
            <p>{users.length}</p>
          </div>
          <div className="PBox">
            <p>Notes</p>
            <p>{notes.length}</p>
          </div>
        </div>
      </div>
      <div><h2 className="text-center userDataTxt">User Data</h2></div>
      {
        // users.map((user) =>
        //  {
        //    notes.map((note) => { //map will return array
        //     if (user._id === note.user) {
        //        <AdminData user={user} note={note} key={note._id} />;
        //        // eslint-disable-next-line
        //     }
        //   })
        // })

        users.forEach((user)=>{
          notes.forEach((note)=>{
            if (user._id === note.user) {
              <AdminData user={user} note={note} key={note._id} />;
            }
          })
        })

      }
    </div>
  );
}
