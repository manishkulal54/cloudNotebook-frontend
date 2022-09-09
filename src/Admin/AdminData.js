import React,{useContext} from 'react'
import "../Stylesheet/Admin.css";

export default function AdminData(props) {
  const {user,note}=props
  return (    
    <div className='Dcontainer' key={note._id}>
        <div className='data'>
            <div className='userInfo'>
                <div className='usName'>{user.name}</div>
                <div className='usEmail'>{user.email}</div>
                <div className='usPhone'>{user.phone}</div>
                
            </div>
            <div className='DNotes'>
                <p className='title'>{note.title}</p>
                <p className='description'>{note.description}</p>
            </div>
        </div>
    </div>
  )
}
