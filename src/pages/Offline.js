import React ,{useState}from 'react'

export default function Offline() {
  const[msg,setMsg]=useState("sorry Page Not Found")
  
  setTimeout(() => {
    setMsg("Returning to Home page")
    returnHome()
  }, 2000);
  function returnHome(){
    setInterval(() => {
      window.location.href="/"
    }, 3000);
  }
  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'red',textAlign:'center',paddingTop:'40vh'}}>
    <h1>{msg}</h1>
</div>
  )
}
