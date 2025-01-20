import React from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
function Template(prompts){
    // function fun(info){
    //    return(
    //     <div>
    //     <h1>info.name</h1>
    //     <p>info.img</p>
    //     </div>
    //    )
    // }
    function Click(event){
         console.log(event.target.name)
    }
    return(
        <div className="cards">
           <Link to="/template1"><div name="c1" onClick={Click} className="card1">
           <h1> <span>Violet</span>  and White</h1>
            <img name="i1" src="./images/tem1.png" alt="" /> 
           </div>
           </Link>
           <Link to="/template2">
           <div name="c2" onClick={Click} className="card2">
           <h1> <span>Pink</span>  and Brown</h1>
           <img name="i2" src="./images/tem2.png" alt="" />
           </div>
           </Link>
           <Link to="/template3"><div name="c3" onClick={Click} className="card3">
            <h1> <span>Blue</span>  and White</h1>
            <img name="i3" src="./images/tem3.png" alt="" /> 
           </div>
           </Link>

           <Link to="/template4"><h1>Temp4</h1></Link>
        </div>
    )
}
export default Template;