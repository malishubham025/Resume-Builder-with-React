import React from "react";
function Nav(){
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
        <span>Home</span>
        <span>Write</span>
        <a href="#footer" style={{textDecoration:"none" ,color:"black",position:"relative",top:"3px"}}><span >Contact</span> </a>
        <button className="nav-button">Get Started</button>
       </div>
      </div>
    )
}
export default Nav;