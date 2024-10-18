import React from "react";
import {Profile} from "./profile";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';
function Nav(){
    // const navigate = useNavigate();
    const [display,setDisplay]=React.useState(true);
    function signout(){
        // alert("hi");
        axios.post("http://localhost:5000/signout").then((res)=>{
            if(res.status===200){
                alert("log out successfully");
                <Navigate to="/" />
            }
            else{
                alert("error !");
            }
        })
    }
    const navigate = useNavigate();
    function profile() {
        console.log("hello");
        navigate("/allresume");
    }
    function displayFun(){
        setDisplay(!display);
    }
    return(
      <div className="Nav">
       <div className="name">
        <div className="communicate">
            <h5>Resume Builder</h5>
            <p>Create and Communicate</p>
        </div>
       </div>
       <div className="nav-items">
       {/* <Profile></Profile> */}
       <div className="display">
        <button onClick={displayFun} style={{cursor:"pointer",border:"none",backgroundColor:"none"}}><img style={{cursor:"pointer",width:"30px"}} src="../images/nav-logo.png" alt="" /></button>
        
       </div>
        {display?( <div className="nav2">
            <div>
            <img className="userimg" onClick={profile} style={{cursor:"pointer"}} src="../images/user.png" alt="" />
            </div>
            <div>
            <span onClick={signout}>Signout</span>
            </div>
            <div>
            <a href="#footer" style={{textDecoration:"none" ,color:"black",position:"relative",top:"3px"}}><span >Contact</span> </a>
            </div>
            <div>
            <a href="/templates"><button className="nav-button">Get Started</button></a>
            </div>
        </div>):""}
       </div>

       
       
       
      </div>
    )
}
export default Nav;