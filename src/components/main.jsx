import React from "react";
import { Link } from "react-router-dom";

function Main(){
    var [state,display]=React.useState(0)
    var [state2,display2]=React.useState(0)
    var [state3,display3]=React.useState(0);
    var [state4,cc]=React.useState(false);
    var style={
        opacity:state,
        transition: "1s ease",
        
    }
    var style2={
        opacity:state2,
        transition: "1s ease"
    }
    var style3={
        opacity:state3,
        transition: "1s ease",
        
    }
    var styleButton={
        transition: "1s ease",
        opacity:state3,
        
        width: "120px",
        padding: "5px",
        borderRadius: "5px",
        marginLeft: "10px",
        fontFamily: "Montserrat, sans-serif",
        border: "1px solid",
        fontWeight: "bold",
        color:"white",
        backgroundColor: "black",
        position: "relative",
        top: "150px",
        left: "190px",
        cursor:"pointer"
    }
    var hoverStyle={
        width: "120px",
        padding: "5px",
        fontWeight: "bold !importent",
        borderRadius: "5px",
        marginLeft: "10px",
        fontFamily: "Montserrat, sans-serif",
        border: "1px solid black",
        fontWeight: "bold",
        backgroundColor: "#FFBF23",
        color: "black",
        position: "relative",
        top: "150px",
        left: "190px",
        cursor:"pointer"
    }
    setTimeout(()=>{display(1)},500);
    setTimeout(()=>{display3(1)},1500);
    setTimeout(()=>{display2(1)},1000);
    function changeColor(){
        cc(!state4);
    }
    function gotoTemplates(){
        // <link rel="stylesheet" href="" />
    }
    return(
        <div className="container2">
        <div className="main">
            <div className="content">
             <h2 className="animation" style={style}>Create. </h2>
             <h2  className="animation" ></h2>
             <h2 className="animation" style={style2}>And Communicate.</h2>
             <p className="animation2" style={style3}>Create Resume with your favourite Templates and with Ai Suggessions</p>
             <a href="/templates"><button className="content-button"  onMouseOver={changeColor} onMouseOut={changeColor} style={state4?hoverStyle:styleButton} onClick={gotoTemplates}>Get Started</button></a>
            </div>
            <div className="image" style={style}>
            
            <img src="main.png" alt="Main Image" />
            </div>
            
        </div>
          <div>
          <footer id="footer">
           <div>
            <i class="fa fa-instagram" style={{fontSize:"24px",cursor:"pointer"}}></i>
            <i class="fa fa-linkedin" style={{fontSize:"24px",cursor:"pointer"}}></i>
            <i class="fa fa-google" style={{fontSize:"24px",cursor:"pointer"}}></i>
            </div>
            
          </footer>
          </div>
        </div>
    )
}
export default Main;