import React from "react";
import {Profile} from "./profile";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';
function Nav(){
    // const navigate = useNavigate();
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
    return(
      <div className="Nav">
       <div className="name">
        <div>
            logo
        </div>
        <div className="communicate">
            <h5>Resume Builder</h5>
            <p>Create and Communicate</p>
        </div>
       </div>
       <div className="nav-items">
       {/* <Profile></Profile> */}
        <img className="userimg" onClick={profile} style={{cursor:"pointer"}} src="../images/user.png" alt="" />
        <span onClick={signout}>Signout</span>
       
        <a href="#footer" style={{textDecoration:"none" ,color:"black",position:"relative",top:"3px"}}><span >Contact</span> </a>
        <button className="nav-button">Get Started</button>
       </div>
      </div>
    )
}
export default Nav;